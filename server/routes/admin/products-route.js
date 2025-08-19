const express = require('express')
const { upload } = require('../../helper/cloudinary')
const { handleImageUpload, addProduct, getAllProducts, deleteProduct, editProduct } = require('../../controllers/admin/products-controller')


const router = express.Router()

router.post("/upload-image", upload.single("my_file"), handleImageUpload)
router.post("/add", addProduct)
router.get("/getAllProducts", getAllProducts)
router.delete("/delete/:productId", deleteProduct)
router.put("/editProduct/:productId", editProduct)
module.exports = router;