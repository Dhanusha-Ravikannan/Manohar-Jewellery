
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const port = 5000
const app = express();
const billRoutes = require('./routes/bills.routes')
const productRoutes = require('./routes/productInfo.routes')
const billItemsRoutes = require('./routes/billItems.routes')

app.use(express.json())
app.use('/bills',billRoutes)
app.use('/products',productRoutes)
app.use('/billItems',billItemsRoutes)

app.listen(port, () => {
    console.log("Server is Running on " + port)
} )
