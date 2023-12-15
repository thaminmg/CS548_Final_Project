const asyncHandler = require("express-async-handler")
const Invoice = require("../models/invoiceModel")

const getInvoices = asyncHandler(async (req, res) => {
    const invoices = await Invoice.find()
    res.status(200).json(invoices)
})

const getInvoice = asyncHandler(async (req, res) => {
    const invoice = await Invoice.findOne({ id: req.params.id })
    if (!invoice) {
        res.status(404)
        throw new Error("Invoice not found")
    }
    res.status(200).json(invoice)
})

const getInvoiceList = asyncHandler(async (req, res) => {

    const customer = req.query.customer;
    const status = req.query.status;
    const date = req.query.date;

    if (status || customer || date) {
        const query = {};
        if (customer) {
            query.customer = { $regex: new RegExp(customer, 'i') };
        }
        if (status) {
            query.status = status;
        }

        if (date) {
            query.date = date;
        }

        const filteredInvoices = await Invoice.find(query);
        res.status(200).json(filteredInvoices);
    } else {

        const allInvoices = await Invoice.find();
        res.status(200).json(allInvoices);
    }
})

const createInvoice = asyncHandler(async (req, res) => {

    const { id, customer, amount, paid, receivable, status, date } = req.body
    if (!id || !customer || !amount || !paid || !receivable || !status || !date) {
        res.status(400)
        throw ("All are mandatory")
    }

    const invoice = await Invoice.create({
        id,
        customer,
        amount,
        paid,
        receivable,
        status,
        date
    })
    res.status(201).json(invoice)
})

const updateInvoice = asyncHandler(async (req, res) => {
    const invoice = await Invoice.findOne({ id: req.params.id })

    if (!invoice) {
        res.status(404)
        throw new Error("Invoice not found")
    }
    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedInvoice)
})

const deleteInvoice = asyncHandler(async (req, res) => {
    const invoice = await Invoice.findOne({ id: req.params.id })

    if (!invoice) {
        res.status(404)
        throw new Error("Invoice not found")
    }
    await Invoice.deleteOne({ id: req.params.id })
    res.status(200).json(invoice)
})

module.exports = { getInvoices, getInvoice, getInvoiceList, createInvoice, updateInvoice, deleteInvoice }