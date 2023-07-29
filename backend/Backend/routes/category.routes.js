const express = require('express');
const router = express.Router(); 
const {createCategory, getCategories,updateCategory,deleteCategory} = require("../controllers/category.controller")


router.post('/category/create', createCategory );
router.get('/category/all', getCategories );
router.patch('/category/:categoryId', updateCategory);
router.delete('/category/:categoryId', deleteCategory);



module.exports = router;