const Order = require("../models/order.model");

exports.createOrder = (req, res) => {
  const { orderNumber, customerName, totalAmount } = req.body;

  const order = new Order({
    orderNumber: orderNumber,
    customerName: customerName,
    totalAmount: totalAmount,
  });

  order
    .save()
    .then((order) => {
      res.status(200).json({ success: true, message: "Order created", order });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error creating order', error: err.message });
    });
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error getting orders', error: error.message });
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, message: 'Order updated', order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error updating order', error: error.message });
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, message: 'Order deleted', order: deletedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting order', error: error.message });
  }
};
