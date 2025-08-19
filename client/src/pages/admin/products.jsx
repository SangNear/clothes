
import ProductImageUpload from '@/components/admin-view/image-upload'
import { AdminProductTitle } from '@/components/admin-view/product-title'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import { addNewProduct, deleteProduct, fetchAllProduct, updateProduct } from '@/store/adminSlice/product'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
const initialFormData = {
  title: '',
  description: '',
  category: '',
  brand: '',
  price: 0,
  salePrice: 0,
  totalStock: 0,
}
const AdminProduct = () => {
  const [openFormCreate, setOpenFormCreate] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState('false')
  const [currentProductId, setCurrentProductId] = useState(null)
  const { productList } = useSelector(state => state.adminProducts)

  console.log("curr id update", currentProductId);

  const dispatch = useDispatch()
  const onSubmit = (e) => {
    e.preventDefault()
    if (currentProductId !== null) {
      dispatch(updateProduct({
        id: currentProductId,
        formData
      })).then((data) => {
        if (data?.payload?.success) {
          setOpenFormCreate(false)
          setCurrentProductId(null)
          setFormData(initialFormData)
          dispatch(fetchAllProduct())
          toast.success(data?.payload?.message)
        }
      })
    }
    else {
      dispatch(addNewProduct({
        ...formData,
        image: imageUrl
      })).then((data) => {
        if (data?.payload?.success) {
          console.log(data);

          setOpenFormCreate(false)
          setImageFile(null)
          setFormData(initialFormData)
          dispatch(fetchAllProduct())
          toast.success(data.payload.messsage)
        }
      }
      )
    }


  }
  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct({ id })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProduct())
      }
    })



  }
  useEffect(() => {
    dispatch(fetchAllProduct())
  }, [dispatch])
  console.log(productList, "formData");




  return (
    <Fragment>
      <Button onClick={() => setOpenFormCreate(true)} className="w-fit ml-auto" >Create a Product</Button>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {productList && productList.length > 0 ? productList.map(productItem =>
          <AdminProductTitle
            key={productItem._id}
            product={productItem}
            setFormData={setFormData}
            setOpenFormCreate={setOpenFormCreate}
            setCurrentProductId={setCurrentProductId}
            handleDeleteProduct={handleDeleteProduct}
          />
        )
          :
          "No Product in stock"}
      </div>
      <Sheet className="px-4 py-6" open={openFormCreate} onOpenChange={() => {
        setOpenFormCreate(false)
        setCurrentProductId(null)
        setFormData(initialFormData)
      }}>
        <SheetContent side='right' className='w-128 px-4 py-6'>
          <SheetTitle>{currentProductId !== null ? "Edit product" : "Add new product "}</SheetTitle>
          <div className='flex flex-col'>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
              isEditMode={currentProductId !== null}
            />
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText={currentProductId !== null ? "edit" : "add"}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProduct