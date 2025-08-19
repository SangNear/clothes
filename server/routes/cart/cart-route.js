const express = require('express')
const { addCart, fetchCart, deleteCart, updateQTYCart } = require('../../controllers/cart/cart')

const router = express.Router()

router.post("/add", addCart)
router.get("/fetchCart/:userId", fetchCart)
router.delete("/delete/:userId/:productId", deleteCart)
router.put("/updateQTY", updateQTYCart)

module.exports = router;