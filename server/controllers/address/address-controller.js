const Address = require("../../models/Address");

const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pincode, phone, notes } = req.body
        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided'
            })
        }
        const newAddress = new Address({
            userId, address, city, pincode, phone, notes
        })

        await newAddress.save()
        return res.status(201).json({
            success: true,
            message: "Create Address successfully!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error at add address func'
        })
    }
}
const fetchAllAddress = async (req, res) => {
    try {
        const { userId } = req.params
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'UserId is not valid'
            })
        }

        const address = await Address.find({ userId })

        return res.status(200).json({
            success: true,
            data: address
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error at fetch address func'
        })
    }
}
const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params
        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided'
            })
        }
        const address = await Address.findOneAndDelete({ _id: addressId, userId })
        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found or not belongs to user'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Address deleted successfully',
            data: address
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error at delete address func'
        })
    }
}
const updateAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params
        const formdata = req.body
        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided'
            })
        }

        const addAddress = await Address.findOneAndUpdate(
            { _id: addressId, userId },
            { $set: formdata },
            { new: true }
        )
        if (!addAddress) {
            return res.status(404).json({
                success: false,
                message: 'Address not found or not belongs to user'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Address updated successfully',
            data: addAddress
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error at update address func'
        })
    }
}

module.exports = { updateAddress, fetchAllAddress, addAddress, deleteAddress }