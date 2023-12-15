const mongoose = require("mongoose")

const customerSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        dropDups: true,
        required: [true, "Please add the contact name"],
    },
    name: {
        type: String,
        unique: true,
        dropDups: true,
        required: [true, "Please add the contact name"],
    },
    gender: {
        type: String,
    },
    dob: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please add the contact email"],
    },
    phone: {
        type: String,
        required: [true, "Please add the contact phone"],
    },
    address: {
        type: String,
    },
    zip: {
        type: String,
        required: [true, "Please add the contact phone"],
    },
    state: {
        type: String,
        required: [true, "Please add the contact phone"],
    }
})

module.exports = mongoose.model("Customer", customerSchema)