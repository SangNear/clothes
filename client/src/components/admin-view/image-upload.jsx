import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloud, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'

const ProductImageUpload = ({ imageFile, isEditMode, setImageLoadingState, imageLoadingState, setImageFile, uploadImageUrl, setImageUrl }) => {
    const inputRef = useRef(null)


    const handleOnChange = (event) => {
        // console.log(event.target.files[0]);

        const selectedFile = event.target.files[0]
        if (selectedFile) {
            setImageFile(selectedFile)
        }
    }

    const handleRemoveFile = () => {
        setImageFile(null)
        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    const handleUploadImageToCloudinary = async () => {
        const data = new FormData()
        data.append("my_file", imageFile)
        const res = await axios.post("http://localhost:5000/api/admin/products/upload-image", data)
        // console.log("data image:", res)
        if (res) {
            setImageLoadingState(false)
            setImageUrl(res.data.result.secure_url)
        }


    }

    useEffect(() => {
        if (imageFile != null) handleUploadImageToCloudinary()
    }, [imageFile])

    return (
        <div className='w-full mx-auto mb-5'>
            <Label >Upload Image Product</Label>
            <div>
                <Input id='image-upload' type='file' accept="image/*" className="hidden" ref={inputRef} onChange={handleOnChange} disabled={isEditMode} />
                {!imageFile ?
                    <Label htmlFor="image-upload" className={`${isEditMode ? "cursor-not-allowed opacity-30" : "cursor-pointer"} w-full h-32  flex flex-col justify-center  border rounded-xl mt-2`}>
                        <UploadCloud />
                        <span className=''>Drag or click here to chosse an image</span>
                    </Label>
                    :
                    (imageLoadingState ? (<Skeleton className='mt-2 h-10 bg-gray-100' />)

                        :
                        (<div className='flex items-center justify-center border rounded-xl p-2 mt-2 border-dashed w-full'>
                            <FileIcon className='w-4 text-primary mr-2 h-8' />
                            <p className='text-sm'>{imageFile.name}</p>
                            <XIcon className='w-4 h-4 ml-auto hover:scale-90 transition-transform cursor-pointer' onClick={handleRemoveFile} />
                        </div>)
                    )

                }
            </div>
        </div>
    )
}

export default ProductImageUpload