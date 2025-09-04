import React, { useEffect } from 'react'
import { SheetContent, SheetFooter, SheetHeader } from '../ui/sheet'
import UserCartContentItems from './userCartContentItems'
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const UserCartWrapper = ({ cart, setOpenCartSheet }) => {
    const navigate = useNavigate()
    function sumPrice(items) {
        let inititalValue = 0
        if (Array.isArray(items)) {
            for (let item of items) {
                inititalValue += item.productId.price * item.quantity
            }
            return inititalValue
        }
    }
    const totalPrice = sumPrice(cart)
    // const handleCheckout = (e) => {
    //     e.preventDefault()
    //     navigate('/shop/checkout')

    // }
    return (
        <SheetContent side='right' className='p-4 '>
            <SheetHeader className='text-xl font-semibold px-0'>Your Cart</SheetHeader>
            <div className='overflow-auto'>
                {cart && cart.length > 0 ? cart.map(item => <UserCartContentItems cartItem={item} />) : null}
            </div>

            <div className='w-full border'>

            </div>
            <div className='flex items-center justify-between'>
                <span className='text-lg font-medium'>Total</span>
                <span className='text-lg font-medium text-orange-500'>${totalPrice}</span>
            </div>
            <Button onClick={
                () => {
                    setOpenCartSheet(false)
                    navigate('/shop/checkout')
                }
            }>
                Checkout
            </Button>
        </SheetContent>
    )
}

export default UserCartWrapper