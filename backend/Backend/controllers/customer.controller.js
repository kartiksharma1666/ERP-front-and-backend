const Customer = require("../models/customer.model");

exports.createCustomer = (req, res) => {
    const { name, email, phone, address } = req.body;
  
    const customer = new Customer({
      name: name,
      email: email,
      phone: phone,
      address: address,
    });
  
    customer
      .save()
      .then((customer) => {
        res.status(200).json({ success: true, message: "Customer created", customer });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error creating customer', error: err.message });
      });
  };
  exports.getCustomers = async (req, res, next) => {
    try {
      const customers = await Customer.find();
      res.status(200).json({ success: true, customers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error getting customers', error: error.message });
    }
  };
  exports.updateCustomer = async (req, res, next) => {
    try {
      const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedCustomer) {
        return res.status(404).json({ success: false, message: 'Customer not found' });
      }
      res.status(200).json({ success: true, message: 'Customer updated', customer: updatedCustomer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error updating customer', error: error.message });
    }
  };
  exports.deleteCustomer = async (req, res, next) => {
    try {
      const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
      if (!deletedCustomer) {
        return res.status(404).json({ success: false, message: 'Customer not found' });
      }
      res.status(200).json({ success: true, message: 'Customer deleted', customer: deletedCustomer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error deleting customer', error: error.message });
    }
  };
        