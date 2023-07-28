// In your routes file (e.g., product.routes.js)

const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Define the route for creating a product
router.post('/create', productController.createProduct);
router.patch('/update', productController.updateProduct);
router.delete('/delete', productController.deleteProduct);


module.exports = router;
