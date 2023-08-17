// const express = require("express");
// const router = express.Router();

// const {
//   createInvoice,
//   updateInvoice,
//   deleteInvoice,
//   getInvoice,
//   getInvoicesByUser,
//   getTotalCount,
// } = require("../controllers/invoice.controller");

// router.get("/count", getTotalCount); //use to generate invoice serial number
// router.get("/:id", getInvoice);
// router.get("/", getInvoicesByUser);
// router.post("/", createInvoice);
// router.patch("/:id", updateInvoice);
// router.delete("/:id", deleteInvoice);

// export default router;

const express = require("express");
const InvoiceController = require("../controllers/invoice.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/Billing/count", InvoiceController.getTotalCount); //use to generate invoice serial number
  app.get("/api/Billing/:id", InvoiceController.getInvoice);
  app.get("/api/Billing/getInvoices/all", InvoiceController.getInvoices);
  app.get("/api/Billing/", InvoiceController.getInvoicesByUser);
  app.post("/api/Billing/", InvoiceController.createInvoice);
  app.patch("/api/Billing/:id", InvoiceController.updateInvoice);
  app.delete("/api/Billing/:id", InvoiceController.deleteInvoice);
};
