import Cart from "../models/cart";
import Product from "../models/product";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id }).populate("products.productId").exec();
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
    const { price, discount, stock } = await Product.findOne({
      _id: productCart.productId,
    }).exec();
    if (existCartUser) {
      let itemIndex = existCartUser.products.findIndex((p) => p.productId == productCart.productId);
      if (itemIndex > -1) {
        let productItem = existCartUser.products[itemIndex];
        productItem.quantity += productCart.quantity;
        productItem.totalPrice += discount ? +financial(price, discount) * productCart.quantity : price * productCart.quantity;
        if (productItem.quantity >= stock) {
          productItem.quantity = stock;
          productItem.totalPrice = discount ? +financial(price, discount) * stock : price * stock;
        };
        existCartUser.products[itemIndex] = productItem;
      }
      else {
        productCart.quantity = productCart.quantity < stock ? productCart.quantity : stock;
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
        userId
      }, { new: true }).populate("products.productId").exec();
      res.status(200).json(cart);
    }
    else {
      productCart.quantity = productCart.quantity < stock ? productCart.quantity : stock;
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
      const cartNew = await cart.populate("products.productId");
      res.status(200).json(cartNew);
    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateCartProduct = async (req, res) => {
  try {
    function financial(x, y) {
      return (x * (1 - y / 100)).toFixed(2);
    };
    const { actionId } = req.params;
    const { productId, id } = req.body;
    const existCart = await Cart.findOne({ _id: id }).exec();
    const product = await Product.findOne({
      _id: productId,
    }).exec();
    let itemIndex = existCart.products.findIndex((p) => p.productId == productId);
    const userId = existCart.userId;
    let newGrandTotal = 0;
    if (actionId == "remove") {
      existCart.products = existCart.products.filter(item => item.productId != productId);
    }
    else if (actionId == "clear") {
      existCart.products = [];
    }
    else if (actionId == 'increase') {
      existCart.products[itemIndex].quantity++;
      existCart.products[itemIndex].totalPrice += product.discount ? (+financial(product.price, product.discount)) : (product.price);
    }
    else if (actionId == 'decrease') {
      existCart.products[itemIndex].quantity--;
      existCart.products[itemIndex].totalPrice -= product.discount ? (+financial(product.price, product.discount)) : (product.price);
    }
    existCart.products.forEach(product => {
      newGrandTotal += product.totalPrice
    });
    const cart = await Cart.findOneAndUpdate({ _id: existCart._id }, {
      products: existCart.products,
      grandTotal: newGrandTotal,
      userId
    }, { new: true }).populate("products.productId").exec();
    return res.json(cart);
  } catch (error) {
    res.json({ message: error.message });
  }


}