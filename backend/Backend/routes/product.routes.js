const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

// CORS middleware to allow headers
router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Register GET route to get all products
router.get("/api/products/all", productController.getProducts);

// Register POST route to create a product
router.post("/api/products/create", productController.createProduct);

// Register PATCH route to update a product
router.patch("/api/products/update", productController.updateProduct);

// Register DELETE route to delete a product
router.delete("/api/products/delete/:id", productController.deleteProduct);

module.exports = router;
