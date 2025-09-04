import React, { useState } from 'react'
import banner from "../../assets/account.jpg"
import { useDispatch, useSelector } from 'react-redux'
import Address from '@/components/shop-view/address'
import UserCartContentItems from '@/components/shop-view/userCartContentItems'
import { Button } from '@/components/ui/button'
import { createNewOrder } from '@/store/order-slice'
import { toast } from 'sonner'
import Loading from '@/components/common/loading'
const ShopCheckout = () => {
  const { cart } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)
  const { approvalURL, isLoading } = useSelector((state) => state.order)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  const dispatch = useDispatch()
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
  function handleInititalPayment() {
    if (cart.item.length === 0) {
      toast.error("Your cart is empty. Please add item to proceed")
      return
    }
    const orderData = {
      userId: user?.id,
      cartId: cart._id,
      cartItems: cart.item.map(singleCartItem => ({
        productId: singleCartItem.productId._id,
        title: singleCartItem.productId.title,
        image: singleCartItem.productId.image,
        price: singleCartItem.productId.price,
        salePrice: singleCartItem.productId.salePrice,
        quantity: singleCartItem.quantity
      })),

      addressInfo: {
        addressId: currentSelectedAddress._id,
        address: currentSelectedAddress.address,
        city: currentSelectedAddress.city,
        pincode: currentSelectedAddress.pincode,
        phone: currentSelectedAddress.phone,
        notes: currentSelectedAddress.notes,
      },
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount: totalPrice,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      payerId: ''
    }
    console.log("data payment", orderData);
    dispatch(createNewOrder(orderData))
      .then((data) => {
        console.log(data.payload.approvalURL);

      })


  }
  if (approvalURL) {
    window.location.href = approvalURL
  }


  return (
    <div className='flex flex-col'>
      <div className='relative w-full h-[300px] '>
        <img src={banner} className='object-cover w-full h-full ' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 my-8 mx-4 gap-3'>
        <div className='border rounded-lg max-h-fit'>
          <Address
            currentSelectedAddress={currentSelectedAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
        </div>
        <div className='flex flex-col'>
          {cart && cart.item && cart.item.length > 0 ? cart.item.map(item => <UserCartContentItems cartItem={item} />) : null}
          <div className='w-full border'>

          </div>
          <div className='flex items-center justify-between'>
            <span className='text-lg font-medium'>Total</span>
            <span className='text-lg font-medium text-orange-500'>${totalPrice}</span>
          </div>
          <Button onClick={handleInititalPayment} className='rounded-xs w-[50%] mx-auto my-10 h-12 mt-5'>
            {
              isLoading ? <Loading /> : "Check with paypal"
            }
          </Button>
        </div>
      </div>

    </div>
  )
}

export default ShopCheckout