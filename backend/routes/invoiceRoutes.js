const express = require("express")

const invoiceRouter = express.Router()
const { getInvoiceList, getInvoice, createInvoice, updateInvoice, deleteInvoice } = require("../controllers/invoiceController.js")

invoiceRouter.route("/").get(getInvoiceList).post(createInvoice)
invoiceRouter.route("/:id").get(getInvoice).put(updateInvoice).delete(deleteInvoice)

module.exports = invoiceRouter