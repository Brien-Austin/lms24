'use client'
import React from 'react'

import { FileUpload } from '@/components/FileUpload'

const onSubmit = ({url } : {url : string}) => {
    console.log(url)
}


const NotesPage = () => {
  return (
    <div>NotesForm
    <FileUpload endpoint='courseAttachment' onChange={(url:any) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}/>
    </div>

  )
}

export default NotesPage;