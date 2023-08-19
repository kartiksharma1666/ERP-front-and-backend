const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: [true, "Please add an order number"],
      unique: true,
    },
    ProductId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    customerName: {
      type: String,
      trim: true,
      required: [true, "Please add a customer name"],
      maxlength: 32,
    },

    totalAmount: {
      type: Number,
      required: [true, "Please add the total amount"],
    },
    OrderStatus: {
      type: String,
      required: [true, "Please add the status of order"],
    },
    OrderMedium: {
      type: String,
      required: [true, "Please specify the mode of payment"],
    },
    ShopId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    // Add more fields as needed for the order model
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
