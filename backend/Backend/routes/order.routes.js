const express = require('express');
const router = express.Router();

const { createOrder, getOrders, updateOrder, deleteOrder } = require("../controllers/order.controller");


router.post('/order/create', createOrder);
router.get('/order/all', getOrders);
router.patch('/order/update', updateOrder);
router.delete('/order/delete/:orderId', deleteOrder);


module.exports = router;
