const express = require('express');
const router = express.Router();

const { createOrder, getOrders, updateOrder, deleteOrder } = require("../controllers/order.controller");

router.post('/order/create', createOrder);
router.get('/order/all', getOrders);
router.patch('/order/:orderId', updateOrder);
router.delete('/order/:orderId', deleteOrder);

module.exports = router;
