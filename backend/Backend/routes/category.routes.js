const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

// module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

//   app.post("/api/category/create", createCategory);
//   app.post("/api/category/all", getCategories);
//   app.post("/api/category/:categoryId", updateCategory);
//   app.post("/api/category/:categoryId", deleteCategory);
// };

router.post('/category/create', createCategory );
router.get('/category/all', getCategories );
router.patch('/category/update', updateCategory);
router.delete('/category/delete/:categoryId', deleteCategory);

module.exports = router;
