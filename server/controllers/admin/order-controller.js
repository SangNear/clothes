const Order = require("../../models/Order");

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        return res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something error occur"
        })
    }
}

const updateStatusOrder = async (req, res) => {
    try {
        const { id } = req.params
        const { orderStatus } = req.body
        const order = await Order.findByIdAndUpdate(id, { orderStatus }, { new: true })
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found!"
            })
        }

        return res.status(200).json({
            success: true,
            data: order
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something error occur"
        })
    }
}

module.exports = { getAllOrders, updateStatusOrder }