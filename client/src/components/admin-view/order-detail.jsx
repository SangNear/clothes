import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import CommonForm from '../common/form'

const initialFormData = {
    status: ''
}
const OrderDetail = () => {
    const [formData, setFormData] = useState(initialFormData)
    const handleUpdateStatus = (e) => {
        console.log("status", formData);
        
        e.preventDefault()
    }
    return (
        <DialogContent>
            <div className='flex items-center justify-between mt-4'>
                <Label>Order ID</Label>
                <p>1231321</p>
            </div>
            <div className='flex items-center justify-between mt-4'>
                <Label>Order Date</Label>
                <p>27/12/2024</p>
            </div>
            <div className='flex items-center justify-between mt-4'>
                <Label>Order Price</Label>
                <p>$54.00</p>
            </div>
            <div className='flex items-center justify-between mt-4'>
                <Label>Order Status</Label>
                <p>Process</p>
            </div>
            <Separator />
            <div className='flex flex-col gap-2'>
                <h3 className='font-medium'>Order Detail</h3>
                <div className='flex justify-between items-center'>
                    <span className='text-sm'>Product One</span>
                    <span className='text-sm'>$100</span>
                </div>
                <h3 className='font-medium'>Shipping Info</h3>
                <div className='flex flex-col'>
                    <span className='text-md text-gray-600'>Lam sang</span>
                    <span className='text-md text-gray-600'>Address</span>
                    <span className='text-md text-gray-600'>City</span>
                    <span className='text-md text-gray-600'>Pincode</span>
                    <span className='text-md text-gray-600'>Notes</span>
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