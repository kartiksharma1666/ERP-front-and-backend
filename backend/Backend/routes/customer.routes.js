const express = require('express');
const router = express.Router(); 

const { createCustomer, getCustomers, updateCustomer, deleteCustomer } = require("../controllers/customer.controller");

router.post('/customer/create', createCustomer);
router.get('/customer/all', getCustomers);
router.patch('/customer/:customerId', updateCustomer);
router.delete('/customer/:customerId', deleteCustomer);

module.exports = router;
