import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import CommonForm from '../common/form'

const initialFormData = {
    status: ''
}
const OrderDetail = ({ orderDetail }) => {
    const [formData, setFormData] = useState(initialFormData)
    console.log("order detail", orderDetail);

    const handleUpdateStatus = (e) => {
        console.log("status", formData);

        e.preventDefault()
    }
    return (
        <DialogContent>
            <div className='flex items-center justify-between mt-4'>
                <Label>Order ID</Label>
                <p>{orderDetail._id}</p>
            </div>
            <div className='flex items-center justify-between mt-4'>
                <Label>Order Date</Label>
                <p>{orderDetail.orderDate.split('T')[0]}</p>
            </div>
            <div className='flex items-center justify-between mt-4'>
                <Label>Order Price</Label>
                <p>{orderDetail.totalAmount}</p>
            </div>
            <div className='flex items-center justify-between mt-4'>
                <Label>Order Status</Label>
                <span className={`text-md px-2  text-center ${orderDetail.orderStatus === 'confirm' ? 'bg-green-600 text-white rounded-lg' : "bg-amber-500 text-white rounded-lg"}`}>{orderDetail.orderStatus}</span>
            </div>
            <Separator />
            <div className='flex flex-col gap-2 '>
                <h3 className='font-medium'>Order Detail</h3>
                <div className='flex flex-col gap-2 max-h-52 overflow-auto px-2'>
                    {orderDetail && orderDetail.cartItems.length > 0
                        ?
                        orderDetail.cartItems.map((productItem) => (
                            <div className='flex items-center gap-4'>
                                <span className='text-sm italic min-w-56'>{productItem.title}</span>
                                <div className='relative w-10 max-h-7 overflow-hidden rounded-md'>
                                    <img src={productItem.image} alt={productItem.title} className='w-full object-cover h-full ' />
                                </div>

                                <span className='text-sm'>x{productItem.quantity}</span>

                                <span className='text-md ml-auto'>${productItem.price}</span>
                            </div>
                        ))

                        :
                        <p>Khong co san pham nao ca</p>
                    }
                </div>


                <h3 className='font-medium'>Shipping Info</h3>
                <div className='flex flex-col'>
                    <span className='text-md text-gray-600 italic'>{orderDetail.addressInfo.address}</span>
                    <span className='text-md text-gray-600 italic'>{orderDetail.addressInfo.city}</span>
                    <span className='text-md text-gray-600 italic'>{orderDetail.addressInfo.pincode}</span>
                    <span className='text-md text-gray-600 italic'>{orderDetail.addressInfo.notes}</span>
                </div>

                <CommonForm
                    formControls={
                        [
                            {
                                label: "Order status",
                                name: "status",
                                componentType: "select",
                                options: [
                                    { id: "pending", label: "Pending" },
                                    { id: "inProcess", label: "In Process" },
                                    { id: "inShipping", label: "In Shipping" },
                                    { id: "delivered", label: "Delivered" },
                                    { id: "rejected", label: "Rejected" }
                                ]
                            }
                        ]
                    }
                    formData={formData}
                    onSubmit={handleUpdateStatus}
                    setFormData={setFormData}
                    buttonText="Update Order Status"
                />
            </div>
        </DialogContent>
    )
}

export default OrderDetail