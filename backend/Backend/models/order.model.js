const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: [true, 'Please add an order number'],
    unique: true,
  },
  customerName: {
    type: String,
    trim: true,
    required: [true, 'Please add a customer name'],
    maxlength: 32,
  },
  totalAmount: {
    type: String,
    required: [true, 'Please add the total amount'],
  },
  // Add more fields as needed for the order model
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
