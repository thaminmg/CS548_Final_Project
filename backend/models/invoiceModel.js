const mongoose = require("mongoose")

const invoiceSchema = mongoose.Schema({
    id: {
        type: String,
        required: [true, "Please add the ID"],
    },
    customer: {
        type: String,
        required: [true, "Please add the customer"],
    },
    amount: {
        type: String,
        required: [true, "Please add the contact phone"],
    },
    paid: {
        type: String,
        required: [true, "Please add the contact email"],
    },
    receivable: {
        type: String,
    },
    status: {
        type: String,
        required: [true, "Please add the customer"],

    },
    date: {
        type: String,
        required: [true, "Please add the customer"],

    },
})

module.exports = mongoose.model("Invoie", invoiceSchema)