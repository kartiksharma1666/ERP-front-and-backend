// In your routes file (e.g., product.routes.js)

const express = require("express");
const productController = require("../controllers/product.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/products/all", productController.getProducts);
  app.post("/api/products/create", productController.createProduct);
  app.patch("/api/products/update", productController.updateProduct);
  app.delete("/api/products/delete/:id", productController.deleteProduct);
};

// Define the route for creating a product
<<<<<<< HEAD
console.log("inside product routes");
router.get('/products/all', productController.getProducts);
router.post('/products/create', productController.createProduct);
router.patch('/products/update', productController.updateProduct);
router.delete('/products/delete/id', productController.deleteProduct);
=======
// console.log("inside product routes");
// router.get("/products/all", productController.getProducts);
//
>>>>>>> 504032b99d41571f0dbd164a840b1333ca5cd355

// module.exports = router;
