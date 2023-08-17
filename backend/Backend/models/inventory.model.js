const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const inventorySchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: 'Product',
    required: [true, 'Please add a product'],
  },
  weight: {
    type: Number,
    required: [true, 'Please add a weight'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please add a quantity'],
  },
  category: {
    type: ObjectId,
    ref: 'Product', // Reference to the same Product model
    required: [true, 'Please add a category'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
