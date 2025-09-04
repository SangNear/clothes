const paypal = require('../../helper/paypal')
const Order = require('../../models/Order')
const Cart = require('../../models/Cart')
const createOrder = async (req, res) => {
    try {
        const { userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId, payerId } = req.body

        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: 'http://localhost:5173/shop/paypal-return',
                cancel_url: 'http://localhost:5173/shop/paypal-cancel'
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map(item => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity
                        }))
                    },
                    amount: {
                        currency: 'USD',
                        total: totalAmount.toFixed(2)
                    },
                    description: 'description'
                }
            ]
        }

        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.log(error)
                return res.status(500).json({
                    success: false,
                    message: 'Error while creating paypal payment'
                })
            } else {
                const newlyCreatedOrder = new Order({
                    userId,
                    cartId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId
                })
                await newlyCreatedOrder.save()

                const approvalURL = paymentInfo.links.find(link => link.rel === 'approval_url').href;

                res.status(201).json({
                    success: true,
                    approvalURL,
                    orderId: newlyCreatedOrder._id
                })
            }

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
    }
}

const capturePayment = async (req, res) => {
    try {
        const { paymentId, payerId, orderId } = req.body

        const order = await Order.findById(orderId)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not exists"
            })
        }

        order.paymentStatus = 'paid'
        order.orderStatus = 'confirm'
        order.paymentId = paymentId
        order.payerId = payerId

        const getCardId = order.cartId

        await Cart.findByIdAndDelete(getCardId)

        await order.save()

        res.status(200).json({
            success: true,
            message: 'Order confirm',
            data: order
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
    }
}
const getAllOrderByUser = async (req, res) => {
    try {
        const { userId } = req.params
        console.log(userId);
        
        const order = await Order.find({ userId: userId })

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "This user is not any orders"
            })
        }

        return res.status(200).json({
            success: true,
            data: order
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
    }
}
const getOrderDetail = async (req, res) => {
    try {
        const { id } = req.params

        const order = await Order.findOne(id)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: order
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
    }
}

module.exports = { createOrder, capturePayment, getAllOrderByUser, getOrderDetail }