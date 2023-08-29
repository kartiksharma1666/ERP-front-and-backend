const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  name: String,
  values: [{ type: String }],
});

module.exports = mongoose.model("Attribute", attributeSchema);
