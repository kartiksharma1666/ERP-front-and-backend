const Category = require("../models/category.model");
const ErrorResponse = require('../utils/errorResponse');


exports.createCategory = async (req, res, next)=>{


    try {
        const category = await Category.create(req.body);
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
      const { id } = req.params;
      const category = await Category.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!category) {
        return next(new ErrorResponse('Category not found', 404));
      }
  
      res.status(200).json({
        success: true,
        category,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  exports.deleteCategory = async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await Category.findByIdAndDelete(id);
  
      if (!category) {
        return next(new ErrorResponse('Category not found', 404));
      }
  
      // Delete the corresponding products for the category
      await Product.deleteMany({ category: id });
  
      res.status(200).json({
        success: true,
        message: 'Category and corresponding products deleted successfully',
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  
  