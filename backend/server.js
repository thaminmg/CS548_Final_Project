const express = require("express")
const errorHandler = require("./middleware/errorHandler")
const connectDb = require("./config/dbConnection")
const dotenv = require("dotenv")
const customerRoute = require("./routes/customerRoutes")
const invoiceRoute = require("./routes/invoiceRoutes")
const cors = require('cors')

dotenv.config()
connectDb()
const app = express()
const port = process.env.port || 8080

app.use(express.json())
app.use(cors());
// app.use("/api/customers", require("./routes/customerRoutes"))
// app.use("/api/invoices", require("./routes/invoiceRoutes"))
app.use("/api/customers", customerRoute)
app.use("/api/invoices", invoiceRoute)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
