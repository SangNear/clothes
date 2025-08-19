import { filterOptions } from '@/config'
import React, { Fragment } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

const ProductFilter = ({ handleFilter, filters }) => {
    return (
        <div className='bg-background'>
            <div className='p-4 border-b'>
                <h2 className='text-lg font-semibold'>Filters</h2>
            </div>
            <div>
                {Object.keys(filterOptions).map((keyItem) => (
                    <Fragment key={keyItem}>
                        <div className='mb-5'>
                            <h3 className='text-md font-medium mb-3'>{keyItem}</h3>
                            <div className='flex flex-col gap-2'>
                                {filterOptions[keyItem].map((option) => (
                                    <Label key={option.id} className='flex gap-2 items-center'>
                                        <Checkbox
                                            checked={
                                                filters &&
                                                Object.keys(filters).length > 0 &&
                                                filters[keyItem] &&
                                                filters[keyItem].indexOf(option.id) > -1
                                            }
                                            onCheckedChange={() => handleFilter(keyItem, option.id)} />
                                        <span className='text-sm font-extralight'>{option.label}</span>
                                    </Label>
                                ))}
                            </div>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default ProductFilter