const express = require('express');
const { getAllProductsFilter, getProductDetails } = require('../../controllers/product/product');



const router = express.Router()


router.get("/get", getAllProductsFilter)
router.get("/get/:productId", getProductDetails)
module.exports = router;