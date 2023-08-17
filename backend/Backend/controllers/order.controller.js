const Order = require("../models/order.model");
const ErrorResponse = require("../utils/errorResponse");
const mongoose = require("mongoose");

exports.createOrder = async (req, res) => {
  const { orderNumber, customerName, totalAmount } = req.body;

  try {
    const newOrder = new Order({
      orderNumber: orderNumber,
      customerName: customerName,
      totalAmount: totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.status(200).json({ success: true, message: "Order created", order: savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating order", error: error.message });
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error getting orders", error: error.message });
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const orderNumber = req.body.orderNumber;

    const currentOrder = await Order.findOne({ orderNumber });

    if (!currentOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const data = {
      orderNumber: req.body.orderNumber,
      customerName: req.body.customerName,
      totalAmount: req.body.totalAmount,
    };

    const orderUpdate = await Order.findOneAndUpdate({ orderNumber }, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      orderUpdate,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};



exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order deleted", order: deletedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting order", error: error.message });
  }
};
