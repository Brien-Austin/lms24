"use client"
import * as z from 'zod'
import axios from 'axios'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'

import {
    Form,FormControl,FormDescription,FormField,FormLabel,FormMessage,FormItem
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import path from 'path'

import { Chapter, Course } from '@prisma/client'
import { cn } from '@/lib/utils'
import { Editor } from '@/components/ui/editor'
import { Preview } from '@/components/ui/preview'
const formSchema = z.object({
    youtubeUrl:z.string().min(1)
})

interface ChapterYoutubeUrlProps {
    initialData : Chapter,
    courseId : string,
    chapterId : string
}

const ChapterYoutubeUrl = ({initialData,courseId,chapterId} : ChapterYoutubeUrlProps) => {

    const [isEditing , setEditing] = useState<boolean>(false)
 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            youtubeUrl:""
        }
    })
    
const {isSubmitting , isValid  } = form.formState;

const router = useRouter();

    const onSubmit =  async(values:z.infer<typeof formSchema>) =>{
        try {
            
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success('Chapter updated successfully')
            toggleEdit();
            router.refresh();
            
          
        } catch  {
            console.log('Error from Component')
            toast.error('Something went wrong')
            
        }
       
    }
 
const toggleEdit =()=> setEditing((current)=>!current)
   
    return ( 
       <div className='mt-6 border bg-slate-100 rounded-md p-4'>
        <div className='font-medium flex items-center justify-between '>
            Chapter Video - Youtube URL
            <Button onClick={toggleEdit} variant="ghost">
               {
                isEditing ? (
                    <>
                    Cancel
                    </>
                ) : (
                    <>
                    <Pencil className='h-4  w-4 mr-2'/>
                    Edit Youtube Url
                    </>
                   )
               }

            
           
            </Button>

        </div>
        {!isEditing ? (
            <>
           <div  className={cn("text-sm mt-2",!initialData.youtubeUrl && "text-slate-500 italic")}>
           {initialData.youtubeUrl ? (<>
           <Preview value={initialData?.youtubeUrl}/>
           </> ): ( <>No url added </>)}</div>
            </>
        ) : (<>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                <FormField control={form.control} name="youtubeUrl" render={({field})=>
            <FormItem>
                <FormControl>
                    <Input placeholder='Add YouTube URL' 
                    {...field}/>
                </FormControl>
            </FormItem>}/>
            <div className='flex items-center gap-x-2 '>
                <Button
                disabled={!isValid || isSubmitting} type='submit'>
                    Save

                </Button>
            </div>

            </form>
            </Form>
        </>)
}
       
       </div>
     );
}
 
export default ChapterYoutubeUrl;