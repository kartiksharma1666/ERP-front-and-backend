const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add a customer name'],
    maxlength: 32,
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Please add an email address'],
    unique: true,
  },
  phone: {
    type: String,
    trim: true,
    required: [true, 'Please add a phone number'],
    maxlength: 15,
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Please add an address'],
    maxlength: 200,
  },
  // Add more fields as needed for the customer model
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
