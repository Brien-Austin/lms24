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
import { Checkbox } from '@/components/ui/checkbox'
const formSchema = z.object({
    isFree:z.boolean().default(false),
})

interface ChapterAccessFormProps {
    initialData : Chapter,
    courseId : string,
    chapterId : string
}

const ChapterAccessForm = ({initialData,courseId,chapterId} : ChapterAccessFormProps) => {

    const [isEditing , setEditing] = useState<boolean>(false)
 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            isFree : Boolean(initialData.isFree)
        }
    })
    
const {isSubmitting , isValid  } = form.formState;

const router = useRouter();

    const onSubmit =  async(values:z.infer<typeof formSchema>) =>{
        try {
            
            const response =  await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            const data = await response.data;
            console.log(data)
            
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
            Chapter access
            <Button onClick={toggleEdit} variant="ghost">
               {
                isEditing ? (
                    <>
                    Cancel
                    </>
                ) : (
                    <>
                    <Pencil className='h-4  w-4 mr-2'/>
                    Edit access
                    </>
                   )
               }

            
           
            </Button>

        </div>
        {!isEditing ? (
            <>
           <div  className={cn("text-sm mt-2",!initialData.isFree && "text-slate-500 italic")}>
           </div>
           {initialData.isFree ? ( <>This chapter is free for preview </>) : ( <>This chapter is not free </>)}
            </>
        ) : (<>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                <FormField control={form.control} name="isFree" render={({field})=>
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormDescription>
                            Make this chapter free for preview
                        </FormDescription>
                    </div>

                </FormItem>
            }/>
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
 
export default ChapterAccessForm;