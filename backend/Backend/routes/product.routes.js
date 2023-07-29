// In your routes file (e.g., product.routes.js)

const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Define the route for creating a product
router.get('/products/all', productController.getProducts);
router.post('/products/create', productController.createProduct);
router.patch('/products/update', productController.updateProduct);
router.delete('/products/delete', productController.deleteProduct);



module.exports = router;