import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Pencil, X } from 'lucide-react'

const AddressItem = ({ addressItem, handleDeleteAddress, setCurrentAddress, setOpenFormAddress, setFormData }) => {
    return (
        <Card className="relative ">
            <X onClick={() => handleDeleteAddress(addressItem._id)} className='absolute top-2 right-2 hover:scale-75 transition-all duration-500 cursor-pointer' />
            <CardContent>
                <div className='flex flex-col'>
                    <span>{addressItem.address}</span>
                    <span>{addressItem.city}</span>
                    <span>{addressItem.phone}</span>
                    <span>{addressItem.pincode}</span>
                    <span>{addressItem.notes}</span>
                </div>
            </CardContent>
            <Pencil
                onClick={() => {
                    setCurrentAddress(addressItem),
                    setFormData({
                        address: addressItem.address,
                        city: addressItem.city,
                        pincode: addressItem.pincode,
                        phone: addressItem.phone,
                        notes: addressItem.notes,
                    })
                    setOpenFormAddress(true)

                }}
                className='absolute bottom-2 right-2 hover:scale-75 transition-all duration-500 cursor-pointer' />
        </Card>
    )
}

export default AddressItem