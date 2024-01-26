'use client'
import React from 'react'
import {  useForm } from 'react-hook-form'
import {
    Form,FormControl,FormDescription,FormField,FormLabel,FormMessage,FormItem
} from '@/components/ui/form'
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    email : z.string().min(1,{
        message: 'Enter Valid Email'
    }),
    password : z.string().min(1,{
        message: 'Please enter Passord'
    })
    
})

const LoginForm = () => {
    const router = useRouter();
    const form  = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues:{
            email : '' , password : ''
        }
    })
    const {isSubmitting , isValid  } = form.formState;

    const onSubmit =  async(values:z.infer<typeof formSchema>) => {
        if ( values.email === 'lmsadmin@gmail.com' && values.password === 'lms2024'){
            console.log(values.email)
            toast.success('Logged In ' )
            setTimeout(() => {
                router.push('/teacher/courses');
            }, 5000);

        }
        else{
            toast.error('Invalid email or password')
        }
        
       

    }
    
  return (
   <div>
    <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} action="" className='lg:mx-10 sm:mx-3 sm:mt-8 lg:mt-10'>
            <FormField control={form.control} name='email' render={({field})=>
            <FormItem>
                <FormControl>
                    <Input  disabled={isSubmitting} placeholder='Email Address' {...field}/> 

                </FormControl>

            </FormItem>}/>



            <div className='lg:mt-5 sm:mt-5'>
            <FormField control={form.control} name='password' render={({field})=>
            <FormItem>
                <FormControl>
                    <Input  disabled={isSubmitting} placeholder='Password' {...field}/> 

                </FormControl>

            </FormItem>}/>
            </div>
            <Button  disabled={!isValid || isSubmitting} type='submit' className='lg:mt-5 sm:mt-8 w-full'>
                Log In
            </Button>

            
        </form>
    </Form>
   

   </div>
  )
}

export default LoginForm