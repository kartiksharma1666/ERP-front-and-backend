const Category = require("../models/category.model");
const ErrorResponse = require('../utils/errorResponse');
const mongoose = require("mongoose");


exports.createCategory = async (req, res, next)=>{
  const data = {
    name: req.body.name,
    subcategories:[]  }


    try {
        const category = await Category.create(data);
        res.status(201).json({
            success: true,
            category
        })
        
    } catch (error) {
        console.log(error);
        next(error);
        
    }
   
}

//get all caregories
exports.getCategories = async (req, res, next)=>{

    try {
        const categories = await Category.find();
        res.status(201).json({
            success: true,
            categories
        })
        
    } catch (error) {
        console.log(error);
        next(error);
        
    }
   
}
exports.updateCategory = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.body.id);

    // Build the data object
    const data = {
      name: req.body.name,
      subcategories: req.body.subcategories.map((sub) => ({ name: sub.name })),
    };

    // Find and update the category using findOneAndUpdate
    const categoryUpdate = await Category.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      categoryUpdate,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

  exports.deleteCategory = async (req, res, next) => {
    try {
      
      
      const category = await Category.findByIdAndDelete(req.params.categoryId);
      
  
      if (!category) {
        return next(new ErrorResponse('Category not found', 404));
      }
  
      // Delete the corresponding products for the category
      await Product.deleteMany({ category: req.params.categoryId });
  
      res.status(200).json({
        success: true,
        message: 'Category and corresponding products deleted successfully',
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  
  