const Product = require("../models/product.model");
const Category = require("../models/category.model");
const ErrorResponse = require('../utils/errorResponse');
// Remove the cloudinary import since we're not using it anymore

exports.createProduct = (req, res ) => {
  const { name, description, price, category } = req.body;

  Category.findOne(
    {
      name: category
    }).then((category) => {

      console.log(category);

      const product = new Product({
        name:name,
        description:description,
        price:price,
        category:category._id,
        })

      product.save()

      .then(()=>{
        res.send({ message: "succesfully saved the product" , product })
      })
      .catch((err) => {
          console.log("ererererre")
          res.status(500).send({ message: err });
      });
    })
    .catch(err=>res.status(500).send({message:err}))



}


exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('category', 'name'); // Use populate to get the category name
    // console.log(products);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
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