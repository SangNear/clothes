const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const adminProductRouter = require("./routes/admin/products-route")
const productRoute = require("./routes/product/product-route")
const cartRoute = require("./routes/cart/cart-route")
const addressRoute = require("./routes/address/address-route")
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config()
app.use(cookieParser());
app.use(express.json());


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma']
}));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("DB Connection Successfully!");
    })
    .catch((error) => {
        console.log(error);
    })

app.use('/api/auth', authRoute)
app.use('/api/admin/products', adminProductRouter)
app.use('/api/products', productRoute)
app.use('/api/products/cart', cartRoute)
app.use('/api/shop/address', addressRoute)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
