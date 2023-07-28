const Product = require("../models/product.model");
const Category = require("../models/category.model");
const ErrorResponse = require('../utils/errorResponse');
// Remove the cloudinary import since we're not using it anymore

exports.createProduct = async (req, res, next) => {
  const { name, description, price, category } = req.body;
  console.log(category);

  try {
    const product = await Product.create({
      name,
      description,
      price,
      category,
    });
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    //current product
    const currentProduct = await Product.findById(req.params.id);

    //build the data object
    const data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    };

    // You can exclude the image-related code since we're not updating the image

    const productUpdate = await Product.findOneAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.status(200).json({
      success: true,
      productUpdate,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    // retrieve current image ID and remove the image-related code since we're not deleting the image

    const rmProduct = await Product.findByIdAndDelete(req.params.id);

    res.status(201).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
