const Customer = require("../models/customer.model");

exports.createCustomer = async (req, res) => {
  const { name, email, phone, address } = req.body;

  // Check if a customer with the same email already exists
  const existingCustomer = await Customer.findOne({ email });

  if (existingCustomer) {
    // Customer already exists, update their information
    existingCustomer.name = name;
    existingCustomer.phone = phone;
    existingCustomer.address = address;

    try {
      const updatedCustomer = await existingCustomer.save();
      res.status(200).json({ success: true, message: "Customer updated", customer: updatedCustomer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error updating customer', error: error.message });
    }
  } else {
    // Create a new customer
    const customer = new Customer({
      name: name,
      email: email,
      phone: phone,
      address: address,
    });

    try {
      const newCustomer = await customer.save();
      res.status(200).json({ success: true, message: "Customer created", customer: newCustomer });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error creating customer', error: err.message });
    }
  }
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
      console.log(req.params.id);
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
      console.log(req.params);
      const customer = await Customer.findById(req.params.customerId);
    if (!customer) {
      // If the product with the given ID is not found, return an error response
      return res.status(404).json({ success: false, message: 'customer not found' });
    }
      const deletedCustomer = await Customer.findByIdAndDelete(req.params.customerId);
      console.log(req.params.customerId);
      if (!deletedCustomer) {
        return res.status(404).json({ success: false, message: 'Customer not found' });
      }
      res.status(200).json({ success: true, message: 'Customer deleted', customer: deletedCustomer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error deleting customer', error: error.message });
    }
  };
        