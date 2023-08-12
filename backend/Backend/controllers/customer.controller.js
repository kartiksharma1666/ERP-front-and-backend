const Customer = require("../models/customer.model");
const ErrorResponse = require("../utils/errorResponse");
const mongoose = require("mongoose");

exports.createCustomer = async (req, res) => {
  
  const { name, email, phone, address } = req.body;
  console.log(req.body);

  try {
    let existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      // Customer already exists, update their information
      existingCustomer.name = name;
      existingCustomer.phone = phone;
      existingCustomer.address = address;
      existingCustomer = await existingCustomer.save();

      res.status(200).json({ success: true, message: "Customer updated", customer: existingCustomer });
    } else {
      // Create a new customer
      const newCustomer = new Customer({
        name: name,
        email: email,
        phone: phone,
        address: address,
      });

      const savedCustomer = await newCustomer.save();
      res.status(200).json({ success: true, message: "Customer created", customer: savedCustomer });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating/updating customer', error: error.message });
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
    //current product

    const id = new mongoose.Types.ObjectId(req.body.id);

    const currentCustomer = await Customer.findById(id);

    //build the data object
    const data = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address
    };

    // You can exclude the image-related code since we're not updating the image

    const customerUpdate = await Customer.findOneAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      customerUpdate,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const deletedCustomer = await Customer.findByIdAndDelete(req.params.customerId);
    if (!deletedCustomer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    res.status(200).json({ success: true, message: 'Customer deleted', customer: deletedCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting customer', error: error.message });
  }
};
