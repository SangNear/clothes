import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Pencil, Trash, X } from 'lucide-react'
import Loading from '../common/loading'

const AddressItem = ({
    addressItem,
    handleDeleteAddress,
    setCurrentEditAddress,
    setOpenFormAddress,
    setFormData,
    setCurrentSelectedAddress,
    currentSelectedAddress
}) => {
    return currentSelectedAddress ? (
        <Card
            className={`relative ${addressItem._id === currentSelectedAddress._id ? "" : "opacity-15 cursor-pointer hover:scale-105 transition-all duration-500"}`}
            onClick={() => setCurrentSelectedAddress(addressItem)}
        >
            {addressItem._id === currentSelectedAddress._id && (
                <Trash
                    onClick={() => handleDeleteAddress(addressItem._id)}
                    className='w-4 text-red-500 absolute top-2 right-2 hover:scale-75 transition-all duration-500 cursor-pointer'
                />
            )}

            <CardContent>
                <div className='flex flex-col'>
                    <span>{addressItem.address}</span>
                    <span>{addressItem.city}</span>
                    <span>{addressItem.phone}</span>
                    <span>{addressItem.pincode}</span>
                    <span>{addressItem.notes}</span>
                </div>
            </CardContent>

            {addressItem._id === currentSelectedAddress._id && (
                <Pencil
                    onClick={(e) => {
                        e.stopPropagation(); // tránh bị trigger setCurrentSelectedAddress
                        setCurrentEditAddress(addressItem);
                        setFormData({
                            address: addressItem.address,
                            city: addressItem.city,
                            pincode: addressItem.pincode,
                            phone: addressItem.phone,
                            notes: addressItem.notes,
                        });
                        setOpenFormAddress(true);
                    }}
                    className='w-4 absolute bottom-2 right-2 hover:scale-75 transition-all duration-500 cursor-pointer'
                />
            )}
        </Card>
    ) : <Loading />
}

export default AddressItem
