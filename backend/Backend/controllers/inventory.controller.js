const Inventory = require('../models/inventory.model');
const Product = require('../models/product.model');
const Category = require('../models/category.model');

// Get all inventory items with product and category details
const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find()
      .populate({
        path: 'product',
        select: 'name', // Include 'category' field for populating category
        populate: {
          path: 'category', // Populate the 'category' field of the 'product'
          select: 'name'
        }
      });

    // Process the inventory data to extract product and category names
    const processedInventory = inventory.map(item => ({
      id: item.id,
      product: item.product ? item.product.name : 'Product Not Found',
      category: item.product.category,
      quantity: item.quantity,
      weight : item.weight
      
      
      
      
      // Include other fields from inventory as needed
    }));
    
   

    res.json({ success: true, inventory: processedInventory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Create a new inventory item and create/update product/category
const createInventory = async (req, res) => {
  try {
    const { product, weight, quantity, category } = req.body;
    

    // Create or update product and category if they don't exist
    

    // Create or update category using the product name as a filter
    const categoryObj = await Category.findOneAndUpdate(
      { name : category },
      {}, // Update fields (if needed)
      { upsert: true, new: true } // Create if not exists, return new doc
    );
    
    const productObj = await Product.findOneAndUpdate(
      { name: product, category:categoryObj._id  },
      {}, // Update fields (if needed)
      { upsert: true, new: true } // Create if not exists, return new doc
    );

    const newInventory = new Inventory({
      product: productObj._id,
      weight,
      quantity,
      category: categoryObj._id
    });
    

    await newInventory.save();

    res.json({ success: true, message: 'Inventory created successfully', inventory: newInventory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update inventory and update related product/category if needed
const updateInventory = async (req, res) => {
  try {
    const { id, product, weight, quantity, category } = req.body;

    // Find the existing inventory item
    const inventory = await Inventory.findById(id);

    // Find or create the category
    const categoryObj = await Category.findOneAndUpdate(
      { name: category },
      {},
      { upsert: true, new: true }
    );

    // Find or create the product with the associated category
    const productObj = await Product.findOneAndUpdate(
      { name: product, category: categoryObj._id },
      {},
      { upsert: true, new: true }
    );

    // Update product and category references
    if (inventory.product !== productObj._id) {
      await Product.findByIdAndUpdate(inventory.product, { name: product });
    }

    if (inventory.category !== categoryObj._id) {
      await Category.findByIdAndUpdate(inventory.category, { name: category });
    }

    // Update inventory fields
    inventory.product = productObj._id;
    inventory.weight = weight;
    inventory.quantity = quantity;
    inventory.category = categoryObj._id;

    await inventory.save();

    res.json({ success: true, message: 'Inventory updated successfully', inventory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Delete inventory item and corresponding product/category if no other inventory references them
const deleteInventory = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    console.log("backend of deleteInventory:", req.params);

    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) {
      return res.status(404).json({ success: false, message: 'Inventory not found' });
    }

    // Check if the product and category are not referenced by any other inventory
    const otherProductReferenced = await Inventory.exists({
      product: inventory.product,
      _id: { $ne: inventoryId } // Exclude the current inventory
    });
    const otherCategoryReferenced = await Inventory.exists({
      category: inventory.category,
      _id: { $ne: inventoryId } // Exclude the current inventory
    });

    if (!otherProductReferenced) {
      await Product.findByIdAndDelete(inventory.product);
    }

    if (!otherCategoryReferenced) {
      await Category.findByIdAndDelete(inventory.category);
    }

    await Inventory.findByIdAndDelete(inventoryId);

    res.json({ success: true, message: 'Inventory deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


module.exports = {
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory
};
