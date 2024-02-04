"use client"

interface Props {
    name  : string
    id : string
    url : string
}
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { Loader2, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const NotesCard = ({name , id , url } : Props) => {
    const router = useRouter();
    const [isDeleteing , setDeleting] = useState<boolean>()
    const onDelete  = async( id : string ) => {
        try {
          setDeleting(true)
          await axios.delete(`/api/commonnotes/${id}`)
          toast.success('Deleted successfully')
          router.refresh();
          
        } catch (error) {
          console.error(error)
          toast.error('Something went wrong')
          
        }
        finally{
          setDeleting(false)
    
    
        }
    
      }
  return (
    <div key={id} className=' flex justify-between items-center bg-slate-100 p-3 rounded'>
              <h1>{name}</h1>
              <div className='flex gap-4 items-center'>
                <Link href={url}>
                <Button>
                  View
                  </Button></Link>

                  <button onClick={()=>onDelete(id)}>
                    {
                      !isDeleteing ? (<>
                      <X size={20} className='h-4 w-4'/>
                      </>) : (
                        <>
                        <Loader2 className='h-4 2-4 animate-spin'/>
                        </>
                      )
                    }
                  </button>
              </div>


            </div>
  )
}

export default NotesCard
