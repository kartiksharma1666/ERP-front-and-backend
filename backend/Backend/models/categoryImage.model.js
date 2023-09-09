const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CategoryImageSchema = new mongoose.Schema({
  categoryId: {
    type: ObjectId,
    // ref: 'Product'
  },
  image: {
    type: Array,
    trim: true,
  },
});

module.exports = mongoose.model("CategoryImages", CategoryImageSchema);
