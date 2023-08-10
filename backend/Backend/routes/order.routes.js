const express = require('express');
const router = express.Router();

const { createOrder, getOrders, updateOrder, deleteOrder } = require("../controllers/order.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

router.post('/order/create', createOrder);
router.get('/order/all', getOrders);
router.patch('/order/:orderId', updateOrder);
router.delete('/order/:orderId', deleteOrder);
};

module.exports = router;
