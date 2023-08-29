const Attribute = require("../models/attribute.model");

// Create a new attribute with values
exports.createAttribute = async (req, res) => {
  const { name, values } = req.body;
  try {
    const newAttribute = new Attribute({ name, values });
    console.log(newAttribute)
    await newAttribute.save();
    res.status(201).json({ message: "Attribute created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create attribute", error });
  }
};
// Update an attribute by ID
exports.updateAttribute = async (req, res) => {
    // const { id } = req.params;
    const { id, name, values } = req.body;
    console.log("this is body:",req.body)
    try {
      const updatedAttribute = await Attribute.findByIdAndUpdate(
        id,
        { name, values },
        { new: true }
      );
      res.status(200).json({ message: "Attribute updated successfully", updatedAttribute });
    } catch (error) {
      res.status(500).json({ message: "Failed to update attribute", error });
    }
  };
  
  // Delete an attribute by ID
  exports.deleteAttribute = async (req, res) => {
    const { id } = req.params;
    try {
      await Attribute.findByIdAndDelete(id);
      res.status(200).json({ message: "Attribute deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete attribute", error });
    }
  };
  exports.getAllAttributes = async (req, res) => {
    try {
      const attributes = await Attribute.find();
      res.status(200).json(attributes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch attributes", error });
    }
  };
  