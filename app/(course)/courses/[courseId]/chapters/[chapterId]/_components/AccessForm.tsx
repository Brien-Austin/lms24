"use client"
import { Button } from '@/components/ui/button';
import { auth, useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
interface Props {
    courseId: string
    userId : string
}
const AccessForm = ({courseId, userId} : Props) => {
 
    const {user} = useUser();
    const userName = user?.emailAddresses[0].emailAddress
    const requestAcces = {
        userId : userId,
        userName : userName,
        courseId : courseId
    }
    
    const [isLoading , setIsLoading] = useState(false)
    const [isDone , setIsDone] = useState(true)
    const onClick = async() => {
       try {
        setIsLoading(true)
     await axios.post(`/api/request`,requestAcces)
      
        toast.success('Added course access request')
        
       } catch (error) {
        toast.error('Unable to process request')
        console.log('ACCESS request error',error)
        
       }
      
    }
  return (
    <Button onClick={onClick} disabled={isLoading}>
        Request Access

    </Button>
  )
}

export default AccessForm