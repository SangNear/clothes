import { deleteCart, updateQTYCart } from '@/store/cartSlice'
import { Minus, Plus, Trash } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../ui/button'

const UserCartContentItems = ({ cartItem }) => {
    const userIdInLocalStorage = JSON.parse(localStorage.getItem('user'))
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    function handleDeleteCart(productId) {
        dispatch(deleteCart({ userId: user?.id, productId: productId }))
    }
    function handleUpdateQTYCart(action) {
        dispatch(updateQTYCart({
            userId: user?.id ? user?.id : userIdInLocalStorage._id,
            productId: cartItem.productId._id,
            quantity: action === "plus" ? cartItem.quantity + 1 : cartItem.quantity - 1
        })).then((data) => {
            console.log("data update QTY", data);
        })
    }
    return (
        <div className='w-full flex items-center mb-4 '>
            <div className='relative overflow-hidden'>
                <img src={cartItem.productId.image} className='object-cover w-[70px] max-h-[70px] rounded-lg' />
            </div>
            <div className='flex flex-col justify-between gap-2 px-2 flex-1'>
                <h3 className='font-sans font-bold text-md tracking-wide'>{cartItem.productId.title}</h3>
                <div className='flex items-center gap-2'>
                    <Button
                        disabled={cartItem.quantity === 1}
                        className={`bg-transparent hover:bg-transparent border text-sm  text-black rounded-full !px-1 
                        h-6 hover:scale-75 ${cartItem.quantity === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
                        onClick={() => handleUpdateQTYCart('minus')}>
                        <Minus />
                    </Button>

                    {cartItem.quantity}
                    <Button className="bg-transparent hover:bg-transparent border text-sm text-black cursor-pointer rounded-full !px-1 h-6 hover:scale-75  " onClick={() => handleUpdateQTYCart('plus')}>
                        <Plus onClick={() => handleUpdateQTYCart('plus')} />
                    </Button>

                </div>
            </div>
            <div className='flex flex-col gap-2  items-end'>
                <span className='text-orange-500 font-sans font-medium'>${cartItem.productId.price * cartItem.quantity}</span>

                <Trash onClick={() => handleDeleteCart(cartItem.productId._id)} className='opacity-70 text-sm hover:scale-75 cursor-pointer' />

            </div>
        </div>
    )
}

export default UserCartContentItems