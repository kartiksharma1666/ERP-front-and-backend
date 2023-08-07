const Product = require("../models/product.model");
const category = require("../models/category.model");
const ErrorResponse = require("../utils/errorResponse");
const mongoose = require("mongoose");
// Remove the cloudinary import since we're not using it anymore

exports.createProduct = (req, res) => {
  const { Name, Description, Price, Category } = req.body;

  category
    .findOne({
      name: Category,
    })
    .then((category) => {
      console.log(category);

      const product = new Product({
        name: Name,
        description: Description,
        price: Price,
        category: category._id,
      });

      product
        .save()

        .then(() => {
          res.send({ message: "succesfully saved the product", product });
        })
        .catch((err) => {
          console.log("ererererre");
          res.status(500).send({ message: err });
        });
    })
    .catch((err) => res.status(500).send({ message: err }));
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category", "name"); // Use populate to get the category name

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
