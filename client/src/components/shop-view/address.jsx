import React, { useEffect, useState } from 'react'
import CommonForm from '../common/form'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress, deleteAddress, fetchAllAddresses, updateAddress } from '@/store/addressSlice/address'
import { toast } from 'sonner'
import AddressItem from './address-item'
import { Button } from '../ui/button'
import { PlusCircle } from 'lucide-react'
const initialValue = {
    address: '',
    city: '',
    pincode: '',
    phone: '',
    notes: '',
}
const Address = ({ setCurrentSelectedAddress, currentSelectedAddress }) => {
    const [formData, setFormData] = useState(initialValue)
    const [openFormAddress, setOpenFormAddress] = useState(false)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { addressList } = useSelector((state) => state.address)
    const [currentEditAddress, setCurrentEditAddress] = useState(null)
    useEffect(() => {
        dispatch(fetchAllAddresses({ userId: user?.id })).then((data) => {
            setCurrentSelectedAddress(data.payload.data[0]);
            
        })
    }, [dispatch])

    function isFormValid() {
        return Object.keys(formData).map((key) => formData[key].trim() !== "").every((item) => item)
    }
    function handleDeleteAddress(addressId) {
        dispatch(deleteAddress({ userId: user?.id, addressId: addressId }))
            .then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddresses({ userId: user?.id }))
                    toast.success(data.payload.message)
                }
            })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (currentEditAddress) {
            dispatch(updateAddress({ userId: user?.id, addressId: currentEditAddress._id, formData }))
                .then((data) => {
                    if (data?.payload?.success) {
                        setFormData(initialValue)
                        setOpenFormAddress(false)
                        toast.success(data.payload.message)
                        dispatch(fetchAllAddresses({ userId: user?.id }))
                    }
                })
        }
        else {
            dispatch(addAddress({ formData, userId: user?.id }))
                .then((data) => {
                    if (data?.payload?.success) {
                        setFormData(initialValue)
                        setOpenFormAddress(false)
                        toast.success(data.payload.message)
                        dispatch(fetchAllAddresses({ userId: user?.id }))
                    }
                })
        }

    }
    const handleOpenFormCreateAddress = () => {
        setOpenFormAddress(true)
    }
    return (
        <div className='flex flex-col p-4'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                {addressList &&
                    addressList.length > 0 ?
                    addressList.map((addressitem, index) => (
                        <AddressItem
                            key={addressitem._id}
                            setOpenFormAddress={setOpenFormAddress}
                            setCurrentEditAddress={setCurrentEditAddress}
                            handleDeleteAddress={handleDeleteAddress}
                            addressItem={addressitem}
                            index={index}
                            setFormData={setFormData}
                            currentSelectedAddress={currentSelectedAddress}
                            setCurrentSelectedAddress={setCurrentSelectedAddress}
                        />
                    ))
                    :
                    <p>chua co dia chi</p>
                }

            </div>
            <div className='py-5'>
                {openFormAddress ? null :
                    <Button variant='outline' className='cursor-pointer' onClick={handleOpenFormCreateAddress}>
                        Add new Address
                        <PlusCircle />
                    </Button>
                }

                {openFormAddress ?
                    <CommonForm
                        formControls={addressFormControls}
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={onSubmit}
                        buttonText={currentEditAddress ? "Update" : "Add new address"}
                        isBtnDisabled={!isFormValid()}
                    />
                    :
                    null
                }

            </div>
        </div>
    )
}

export default Address