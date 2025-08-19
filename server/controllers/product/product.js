const Product = require("../../models/Product");

const getAllProductsFilter = async (req, res) => {
    try {
        const { category = [], brand = [], sortBy = "" } = req.query

        let filters = {}

        if (category.length) {
            filters.category = { $in: category.split(',') }
        }

        if (brand.length) {
            filters.brand = { $in: brand.split(',') }
        }

        let sort = {}

        switch (sortBy) {
            case 'price-lowtohigh':
                sort.price = 1
                break;
            case 'price-hightolow':
                sort.price = -1
                break;
            case 'title-atoz':
                sort.title = 1
                break;
            case 'title-ztoa':
                sort.price = -1
                break;
            default:
                sort.price = 1
                break;
        }

        const products = await Product.find(filters).sort(sort)
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
const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.params
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!"
            })
        }
        return res.status(200).json({
            success: true,
            data: product
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error occured"
        })
    }
}
module.exports = { getAllProductsFilter, getProductDetails }
