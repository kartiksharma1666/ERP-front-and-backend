const mongoose = require("mongoose");

const BillingCartSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BillingCart", BillingCartSchema);
