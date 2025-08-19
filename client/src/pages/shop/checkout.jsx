import React from 'react'
import banner from "../../assets/account.jpg"
import { useSelector } from 'react-redux'
import Address from '@/components/shop-view/address'
import UserCartContentItems from '@/components/shop-view/userCartContentItems'
import { Button } from '@/components/ui/button'
const ShopCheckout = () => {
  const { cart } = useSelector((state) => state.cart)
  console.log("cart item from checkout", cart);

  function sumPrice(items) {
    let inititalValue = 0
    if (Array.isArray(items)) {
      for (let item of items) {
        inititalValue += item.productId.price * item.quantity
      }
      return inititalValue
    }
  }
  const totalPrice = sumPrice(cart.item)
  return (
    <div className='flex flex-col'>
      <div className='relative w-full h-[300px] '>
        <img src={banner} className='object-cover w-full h-full ' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 my-8 mx-4 gap-3'>
        <div className='border rounded-lg max-h-fit'>
          <Address />
        </div>
        <div className='flex flex-col'>
          {cart && cart.item && cart.item.length > 0 ? cart.item.map(item => <UserCartContentItems cartItem={item} />) : null}
          <div className='w-full border'>

          </div>
          <div className='flex items-center justify-between'>
            <span className='text-lg font-medium'>Total</span>
            <span className='text-lg font-medium text-orange-500'>${totalPrice}</span>
          </div>

        </div>
      </div>
      <Button>
        Checkout with paypal
      </Button>
    </div>
  )
}

export default ShopCheckout