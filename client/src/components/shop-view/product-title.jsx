import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';



const ShopingProduct = ({ product, handleCLickProductDetail, handleAddCart }) => {

    return (
        <Card className="w-full pt-0" onClick={() => handleCLickProductDetail(product._id)}>
            <div>
                <div className='relative w-full overflow-hidden'>
                    <img src={product.image} alt='img' className='w-full h-[300px] object-cover rounded-t-lg' />
                </div>

                <CardContent>
                    <h2 className='text-lg font-bold mt-2'>{product.title}</h2>
                    <div className='flex items-center justify-between mt-2'>
                        <span className={`text-[16px] font-light ${product.salePrice > 0 ? "line-through" : ""}`}>${product.price}</span>
                        <span className='text-green-500'>${product.salePrice}</span>
                    </div>
                    <Button
                        className='w-full mt-4 z-20'
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddCart(product._id)
                        }}>
                        <ShoppingCart />
                        Add to cart
                    </Button>
                </CardContent>
            </div>
        </Card>
    )
}

export default ShopingProduct