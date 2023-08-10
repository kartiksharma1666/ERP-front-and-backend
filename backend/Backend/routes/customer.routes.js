const express = require('express');
const router = express.Router(); 

const { createCustomer, getCustomers, updateCustomer, deleteCustomer } = require("../controllers/customer.controller");

router.post('/customer/create', createCustomer);
router.get('/customer/all', getCustomers);
router.patch('/customer/update', updateCustomer);
router.delete('/customer/delete/:customerId', deleteCustomer);

module.exports = router;
