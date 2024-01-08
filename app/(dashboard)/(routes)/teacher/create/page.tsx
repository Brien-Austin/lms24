"use client"
import * as z from 'zod'
import axios from 'axios'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'

import {
    Form,FormControl,FormDescription,FormField,FormLabel,FormMessage,FormItem
} from '@/components/ui/form'
import { title } from 'process'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
const formSchema = z.object({
    title:z.string().min(1,{
        message:"Title is required"
    })
})
const Create = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            title:""
        }
    })

    const onSubmit =  async(values:z.infer<typeof formSchema>) =>{
        try {
            const response = await axios.post("/api/courses",values);
            router.push(`/teacher/courses/${response.data.id}`)
            toast.success("Course created")
            console.log(response.data)
            
        } catch  {
            toast.error('Something went wrong')
            
        }
       
    }
    const {isSubmitting,isValid} = form.formState;

   
    return ( 
        <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
            <div>
                <h1 className='text-2xl'>
                    Name your course
                </h1>
                <p className='text-sm text-slate-600'>What would you like to name your course ? Don&apos;t worry you can change it later </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField 
                        control={form.control}
                        name = "title"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Course Title
                                </FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isSubmitting} placeholder="eg - 'Advanced Web Development'" {...field} />
                                </FormControl>
                                <FormDescription>
                                    What will you teach in this course ?
                                </FormDescription>
                                
                             
                            </FormItem>
                        )}
                        />
                        <div className='flex items-center gap-x-2'>
                            <Link href={"/"}>
                                <Button type='button' variant='ghost'>
                                    Cancel

                                </Button>
                             
                            </Link>
                            <Button type='submit' disabled={!isValid || isSubmitting}>
                                    Continue
                                </Button>
                        </div>



                    </form>
                </Form>
            </div>
           
        </div>
     );
}
 
export default Create;