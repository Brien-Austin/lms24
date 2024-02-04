'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { FileUpload } from '@/components/FileUpload'


import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { db } from '@/lib/db'
import Link from 'next/link'
import { Loader2, X } from 'lucide-react'
import NotesCard from './NotesCar'

interface NotesProps{
  id  : string
  name : string,
  url : string
}

const NotesPage = () => {
  const [isDeleteing , setDeleting] = useState<boolean>()
  const [notes,setNotes] = useState<NotesProps[]>([])
  useEffect( ()=>{
    const fetchNotes = async() =>{

      const response = await axios.get('/api/commonnotes');
      const data = await response.data;
      setNotes(data)


    }
    fetchNotes();
  },[])
  console.log(notes)
  const router = useRouter();
  const [ loading , setLoading] = useState<boolean>(false);
  const [name,setName] = useState<string>()
  const [url,setUrl] = useState<string>()
  const notesData = {
    name,
    url
  }
  const onImageSubmit = ({url } : {url : string}) => {
    setUrl(url)
      console.log(url)
  }
  console.log(name)
  const onSubmit = async() =>{
    try {
      setLoading(true)
      await axios.post('/api/commonnotes',notesData)
      toast.success('Notes Added')
      router.refresh();
      
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
      
    }
    finally{
      setLoading(false)

    }

  }

  console.log(url)

  const onDelete  = async( id : string ) => {
    try {
      setDeleting(true)
      await axios.delete(`/api/commonnotes/${id}`)
      toast.success('Deleted successfully')
      
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
      
    }
    finally{
      setDeleting(false)


    }

  }
  return (
    <div>
      <Drawer>
      <DrawerTrigger className='p-5'>
      <Button className='bg-emerald-500 hover:bg-emerald-400 focus:bg-emerald-400 text-white w-full'>
      Add a Note
      </Button>
      </DrawerTrigger>
      <DrawerContent className='px-10'>
     

        <form onSubmit={onSubmit} className='mt-10'>
          <div className="flex    w-full">
            <input  onChange={(e)=>setName(e.target.value)}type="text" name='name'  placeholder='Name of the Note ' className='h-10 text-sm outline-none rounded-md mb-3 p-2 w-full border' />
            
          </div>
        <div  className='mb-8'>
        {
          !url ? ( <>
          <FileUpload   endpoint='courseAttachment' onChange={(url:any) => {
              if (url) {
                onImageSubmit({ url: url });
              }
            }}/>
            </>) : ( 
            <div className=' rounded-md p-3 bg-emerald-200 border border-emerald-800'>
            Uploaded the Document
            <h1 className=" text-slate-500 text-muted-foreground">
              Publish the notes !
            </h1>
          </div>
          )
        }
        </div>
        <Button type='submit' className='w-full mb-3 '>
            Publish Notes 🚀
        </Button>
          
        </form>
      < DrawerClose />
      </DrawerContent>
      </Drawer>
      
      <div  className='px-5 py-3'>
        <h1 className="text-xl text-slate-700">
          Notes uploaded so far
        </h1>
        
      <div className='flex flex-col  mt-5 gap-5'>
        {
          notes.map((note) =>(
            <NotesCard key={note.id} id={note.id} name={note.name} url={note.url}/>
          ))
        }
      </div>
      </div>

    {/*  */}
    </div>

  )
}

export default NotesPage;