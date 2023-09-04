const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add a product Name'],
    maxlength: 32,
  },
  description: {
    type: String,
    trim: true,
    // required: [true, 'Please add a product Description'],
    maxlength: 2000,
  },
  price: {
    type: Number,
    trim: true,
    // required: [true, 'Product must have a price'],
    maxlength: 32,
  },
  category: {
    type: ObjectId,
    ref: 'Category',
    // required: [true, 'Product must belong to a category'],
  },
  // image: {
  //   public_id: {
  //       type: Array,
  //       // required: true
  //   },
  //   url: {
  //       type: String,
  //       // required: true
  //   }
  
  image:{ type: Array,
  ref: 'Image'},
  


  
  
}, { timestamps: true });
productSchema.add({
  attributes: {
    type: Array,
    
  }
});

module.exports = mongoose.model('Product', productSchema);
