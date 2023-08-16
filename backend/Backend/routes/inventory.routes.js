const express = require('express');
const inventoryController = require('../controllers/inventory.controller');

const router = express.Router();

// Define routes for inventory
router.get('/all', inventoryController.getInventory);
router.post('/create', inventoryController.createInventory);
router.patch('/update', inventoryController.updateInventory);
router.delete('/delete/:id', inventoryController.deleteInventory);

module.exports = router;
