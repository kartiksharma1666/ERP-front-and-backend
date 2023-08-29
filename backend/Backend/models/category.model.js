const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    
  },
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add a category Name'],
  },
  subcategories: [subcategorySchema], // Array of subcategories
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
