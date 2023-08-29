const Product = require("../models/product.model");
const Category = require("../models/category.model");
const ErrorResponse = require("../utils/errorResponse");
const mongoose = require("mongoose");
const Attribute = require("../models/attribute.model");
// Remove the cloudinary import since we're not using it anymore


exports.createProduct = async (req, res) => {
  const { Name, Description, Price, Category: categoryName, Attributes } = req.body;
  

  try {
    const category = await Category.findOne({ name: categoryName });
    
    if (!category) {
      return res.status(400).json({ success: false, message: "Category not found" });
    }

    const product = new Product({
      name: Name,
      description: Description,
      price: Price,
      category: category._id,
      attributes:[] // Initialize attributes as an empty object
    });
    const a = [];
    for (const attribute of Attributes) {
      const attributeName = attribute.name;
      const attributeValues = attribute.values;
      a.push({
        name: attributeName,
        values: attributeValues
      })
    
      // Update the product's attributes fiel
    }
       
    product.attributes=a;
    await product.save();

    res.status(201).json({ success: true, message: "Product created", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category", "name"); // Use populate to get the category name
    // console.log(products);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    //current product

    const id = new mongoose.Types.ObjectId(req.body.id);

    const currentProduct = await Product.findById(id);

    //build the data object
    const data = {
      name: req.body.Name,
      description: req.body.Description,
      price: req.body.Price,
    };

    // You can exclude the image-related code since we're not updating the image

    const productUpdate = await Product.findOneAndUpdate(id, data, {
      new: true,
    });

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
    console.log(req.params);
    const product = await Product.findById(req.params.id);
    if (!product) {
      // If the product with the given ID is not found, return an error response
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // If the product is found, proceed with deleting it
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      // If the deletion process fails, return an error response
      return res.status(500).json({ success: false, message: 'Failed to delete product' });
    }

    // If the product is successfully deleted, return a success response
    res.status(200).json({ success: true, message: 'Product deleted', deletedProduct });
  } catch (error) {
    // If an error occurs during the deletion process, handle and return the error response
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting product', error });
  }
};
