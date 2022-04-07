import Cart from "../models/cart";
import Product from "../models/product";
import cart from "../models/cart";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id }).populate("products.productId").populate("userId").exec();
    cart.userId.password = null;
    return res.json(cart);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  function financial(x, y) {
    return (x * (1 - y / 100)).toFixed(2);
  };
  try {
    const { productCart, userId } = req.body;
    const existCartUser = await Cart.findOne({ userId: userId }).exec();
    const { price, discount } = await Product.findOne({
      _id: productCart.productId,
    }).exec();
    if (existCartUser) {
      let itemIndex = existCartUser.products.findIndex((p) => p.productId == productCart.productId);
      console.log(itemIndex);
      if (itemIndex > -1) {
        let productItem = existCartUser.products[itemIndex];
        productItem.quantity += productCart.quantity;
        productItem.totalPrice += discount ? +financial(price, discount) * productCart.quantity : price * productCart.quantity;
        existCartUser.products[itemIndex] = productItem;
      }
      else {
        existCartUser.products.push({
          productId: productCart.productId,
          quantity: productCart.quantity,
          totalPrice: discount ? +financial(price, discount) * productCart.quantity : price * productCart.quantity
        })
      }
      let newGrandTotal = 0;
      existCartUser.products.forEach(product => {
        newGrandTotal += product.totalPrice
      });
      const cart = await Cart.findOneAndUpdate({ _id: existCartUser._id }, {
        products: existCartUser.products,
        grandTotal: newGrandTotal,
      }, { new: true }).exec();
      res.status(200).json(cart);
    }
    else {
      console.log(price, discount);
      const cart = await new Cart({
        products: [
          {
            productId: productCart.productId,
            quantity: productCart.quantity,
            totalPrice: discount ? (+financial(price, discount) * productCart.quantity) : (price * productCart.quantity),
          }
        ],
        grandTotal: discount ? +financial(price, discount) * productCart.quantity : price * productCart.quantity,
        userId
      }).save();
      res.status(200).json(cart);
    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

