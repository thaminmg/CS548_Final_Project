const asyncHandler = require("express-async-handler")
const Customer = require("../models/customerModel")

const getCustomers = asyncHandler(async (req, res) => {
    const customers = await Customer.find()
    res.status(200).json(customers)
})

const getCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ id: req.params.id })
    if (!customer) {
        res.status(404)
        throw new Error("Customer not found")
    }
    res.status(200).json(customer)
})

const getCustomerList = asyncHandler(async (req, res) => {
    const name = req.query.name;
    const state = req.query.state;
    const gender = req.query.gender;

    if (state || gender || name) {
        const query = {};
        if (name) {
            query.name = { $regex: new RegExp(name, 'i') };
        }
        if (state) {
            query.state = state;
        }
        if (gender) {
            query.gender = gender;
        }

        const filteredCustomers = await Customer.find(query);
        res.status(200).json(filteredCustomers);
    } else {
        const allCustomers = await Customer.find();
        res.status(200).json(allCustomers);
    }
})

const createCustomer = asyncHandler(async (req, res) => {
    const { id, name, gender, dob, email, phone, address, zip, state } = req.body
    if (!id || !name || !email || !phone || !zip || !state) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const customer = await Customer.create({
        id,
        name,
        gender,
        dob,
        email,
        phone,
        address,
        zip,
        state
    })

    res.status(201).json(customer)
})

const updateCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ id: req.params.id })
    if (!customer) {
        res.status(404)
        throw new Error("Customer not found")
    }
    const updatedCustomer = await Customer.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
    res.status(200).json(updatedCustomer)
})

const deleteCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ id: req.params.id })

    if (!customer) {
        res.status(404)
        throw new Error("Customer not found")
    }
    await Customer.deleteOne({ id: req.params.id })
    res.status(200).json(customer)
})

module.exports = { getCustomers, getCustomer, getCustomerList, createCustomer, updateCustomer, deleteCustomer }