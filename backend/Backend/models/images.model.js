const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ImageSchema = new mongoose.Schema({
    productId: {
        type: ObjectId,
        // ref: 'Product'
    },
  image: {
    type: Array,
    trim: true,
    
  },
});



module.exports = mongoose.model('Image', ImageSchema);
