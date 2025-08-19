import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog'

const ProductDetail = ({ open, setOpen, product }) => {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="grid grid-cols-2 max-w-[90vw] lg:max-w-[70vw] ">
                <div className='relative  overflow-hidden rounded-lg'>
                    <img
                        src={product && product.image}
                        className='aspect-square rounded-lg w-full object-cover '
                        width={600}
                        height={600} />
                </div>
                <div className='flex flex-col'>
                    <h1 className='text-lg font-bold font-sans -tracking-tighter text-orange-500'>{product && product.title}</h1>

                    <span className='text-xl text-orange-500 '>${product && product.price}</span>
                    <p className='font-sans text-lg'>{product && product.description}</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetail