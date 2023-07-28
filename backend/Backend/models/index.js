const mongoose = require('mongoose');
const { validate } = require('./user.model');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin", "moderator"];

// {mongoose,user->usermodel,role->rolemodel,ROLES->[user,admin,moderator]}
// console.log(db)

module.exports = db;

// schema -> model -> document 


