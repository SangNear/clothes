const { imageUploadUtil } = require("../../helper/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = "data:" + req.file.mimetype + ";base64," + b64
        const result = await imageUploadUtil(url)

        res.json({
            success: true,
            result
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error occured"
        })
    }
}

const addProduct = async (req, res) => {
    try {
        const { image, title, description, price, category, salePrice, brand, totalStock } = req.body
        const newProduct = new Product({
            image, title, description, price, category, salePrice, brand, totalStock
        })

        if (newProduct) {
            await newProduct.save()
            res.status(201).json({
                success: true,
                messsage: "Create a product successfully"
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error occured"
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        return res.json({
            success: true,
            data: products
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error occured"
        })
    }
}

const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    console.log("id from be", productId);
    
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error at delete function"
        });
    }
}

const editProduct = async (req, res) => {
    const { productId } = req.params
    try {
        const { image, title, description, price, category, salePrice, brand, totalStock } = req.body
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        product.title = title || product.title
        product.description = description || product.description
        product.image = image || product.image
        product.price = price || product.price
        product.category = category || product.category
        product.salePrice = salePrice || product.salePrice
        product.brand = brand || product.brand
        product.totalStock = totalStock || product.totalStock

        await product.save()
        return res.status(200).json({
            success: true,
            message: "Product updated"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error at edit product function"
        });
    }
}

module.exports = { handleImageUpload, addProduct, getAllProducts, deleteProduct, editProduct }