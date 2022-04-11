import shortid from "shortid";
import Orders from "../models/order"

export const createOrder = async (req, res) => {
  try {
    const { name, phone, address, note, userId, products, total } = req.body;
    const order = await new Orders({
      orderCode: shortid.generate(),
      shippingInfo: {
        name,
        phone,
        address,
        note
      },
      total,
      products,
      userId
    }).save();
    res.json(order);
  } catch (error) {
    res.json({ message: error.message });
  }
}
export const getOrders = async (req, res) => {
  try {
    const order = await Orders.find().exec();
    res.json(order);
  } catch (error) {
    res.json({ message: error.message });
  }
}