import React from 'react'
import banner from "../../assets/account.jpg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Address from '@/components/shop-view/address'
import ShoppingOders from '@/components/shop-view/shopOrder'
const ShopAccount = () => {
  return (
    <div className='flex flex-col'>
      <div className='relative w-full h-[300px] overflow-hidden '>
        <img src={banner} className=' object-cover  w-full h-full ' />
      </div>
      <div className='container mx-auto border my-12 shadow-lg rounded-lg'>
        <Tabs className="p-4" defaultValue="order">
          <TabsList>
            <TabsTrigger value="order">Orders</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
          </TabsList>
          <TabsContent value="order">
            <ShoppingOders />
          </TabsContent>
          <TabsContent value="address">
            <Address />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ShopAccount