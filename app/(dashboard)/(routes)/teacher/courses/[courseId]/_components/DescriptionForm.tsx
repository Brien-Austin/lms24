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
import { Textarea } from '@/components/ui/textarea'
import { Course } from '@prisma/client'
import { cn } from '@/lib/utils'
const formSchema = z.object({
    description:z.string().min(1,{
        message:"description is required"
    })
})

interface descriptionProps {
    initialData : Course,
    courseId : string
}

const DescriptionForm = ({initialData,courseId} : descriptionProps) => {

    const [isEditing , setEditing] = useState<boolean>(false)
 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            description:""
        }
    })
    
const {isSubmitting , isValid  } = form.formState;

const router = useRouter();

    const onSubmit =  async(values:z.infer<typeof formSchema>) =>{
        try {
            await axios.patch(`/api/courses/${courseId}`,values);
            toast.success('Description updated successfully')
            toggleEdit();
            router.refresh();
            
          
        } catch (error) {
            console.log('Error from Component',error)
            toast.error('Something went wrong')
            
        }
       
    }
 
const toggleEdit =()=> setEditing((current)=>!current)
   
    return ( 
       <div className='mt-6 border bg-slate-100 rounded-md p-4'>
        <div className='font-medium flex items-center justify-between '>
            Course description
            <Button onClick={toggleEdit} variant="ghost">
               {
                isEditing ? (
                    <>
                    Cancel
                    </>
                ) : (
                    <>
                    <Pencil className='h-4  w-4 mr-2'/>
                    Edit description
                    </>
                   )
               }

            
           
            </Button>

        </div>
        {!isEditing ? (
            <>
           <p  className={cn("text-sm mt-2",!initialData.description && "text-slate-500 italic")}>{initialData.description || 'No Description added'}</p>
            </>
        ) : (<>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                <FormField control={form.control} name="description" render={({field})=>
            <FormItem>
                <FormControl>
                    <Textarea  disabled={isSubmitting}
                    placeholder={`The course is about ...`}
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
 
export default DescriptionForm;