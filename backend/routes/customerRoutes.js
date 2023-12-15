const express = require("express")

const customerRouter = express.Router()
const { getCustomer, getCustomerList, createCustomer, updateCustomer, deleteCustomer } = require("../controllers/customerController.js")

customerRouter.route("/").post(createCustomer).get(getCustomerList)
customerRouter.route("/:id").put(updateCustomer).delete(deleteCustomer).get(getCustomer)

module.exports = customerRouter