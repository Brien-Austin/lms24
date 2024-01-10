"use client"

import {UploadDropzone} from '@/lib/uploadthing'
import {ourFileRouter} from '@/app/api/uploadthing/core'
import toast from 'react-hot-toast'

interface fileUploaderProps {
    onChange : (url?: string) => void
    endpoint : keyof typeof ourFileRouter
}


export const FileUpload= ( {onChange , endpoint} : fileUploaderProps) =>{
    return (
        <>
    <UploadDropzone
    endpoint={endpoint}
    onClientUploadComplete={(res)=>{
        onChange(res?.[0].url)
    }}
    onUploadError={(error:Error)=>{
        toast.error("Something went wrong")
    }}

    />
    </>
    )

}
