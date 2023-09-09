const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema({
  dueDate: Date,
  currency: String,
  items: [
    { itemName: String, unitPrice: String, Addquantity: String, discount: String , category: String,
       // Replace "Category" with the actual model name for categories
    }, ,
  ],
  rates: String,
  vat: Number,
  total: Number,
  subTotal: Number,
  notes: String,
  status: String,
  invoiceNumber: String,
  type: String,
  creator: String,
  totalAmountReceived: Number,
  client: { name: String, email: String, phone: String, address: String },
  paymentRecords: [
    {
      amountPaid: Number,
      datePaid: Date,
      paymentMethod: String,
      note: String,
      paidBy: String,
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// const InvoiceModel = mongoose.model("InvoiceModel", InvoiceSchema);
// export default InvoiceModel;

module.exports = mongoose.model("Invoice", InvoiceSchema);

// "dueDate": '1987-09-28',
// "currency": "INR",
// "items": [
//   { "itemName": "Vanila Cake", "unitPrice": "200", "quantity": "2", "discount": "0" },
// ],
// "rates": "18",
// "vat": "72",
// "total": 472,
// "subTotal": 400,
// "notes": "after delivery",
// "status": "uppaid",
// "invoiceNumber": "1",
// "type": "Invoice",
// "creator": ["omkar"],
// "totalAmountReceived": "0",
// "client": { "name": "kalu", "email": "tanu", "phone": "822288855", "address": "near dog station" },
// "paymentRecords": [
//   {
//     "amountPaid": 200,
//     "datePaid": '1987-09-28',
//     "paymentMethod": "gpay",
//     "note": "delivery on time",
//     "paidBy": "kalu",
//   },
// ],
