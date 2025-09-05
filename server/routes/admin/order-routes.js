const express = require('express');
const { getAllOrders, updateStatusOrder } = require('../../controllers/admin/order-controller');

const router = express.Router()

router.get("/getAllOrderAdmin", getAllOrders)
router.put("/updateStatusOrder/:id", updateStatusOrder)

module.exports = router;