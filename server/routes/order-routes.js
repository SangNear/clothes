const express = require('express');
const { createOrder, capturePayment, getAllOrderByUser, getOrderDetail } = require('../controllers/shop/order-controller');


const router = express.Router()

router.post('/create', createOrder)
router.post('/capture', capturePayment)
router.get('/getAllOrders/:userId', getAllOrderByUser)
router.get('/getOrderDetail/:id', getOrderDetail)

module.exports = router;