const express = require("express");
const attributeController = require("../controllers/attribute.controller");
const router = express.Router();

// Create a new attribute
router.post("/attributes/create", attributeController.createAttribute);

// Update an attribute by ID
router.patch("/attributes/update", attributeController.updateAttribute);

// Delete an attribute by ID
router.delete("/attributes/delete/:id", attributeController.deleteAttribute);
router.get("/attributes/all", attributeController.getAllAttributes);
module.exports = router;
