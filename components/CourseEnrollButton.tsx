'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { formatPrice } from '@/lib/formatCurrency'
import toast from 'react-hot-toast'
import axios from 'axios'

interface props{
    price : number
    courseId : string
}

const CourseEnrollButton = ({price,courseId} : props) => {
  const [isLoading,setIsLoading] =useState(false)

  const onClick = async() =>{
    try {
      setIsLoading(true)
      const response = await axios.post(`/api/courses/${courseId}/checkout`)
      window.location.assign(response.data.url)
      
    } catch (error) {
      toast.error('Something went wrong ')
      
    }
    finally {
      setIsLoading(false)

    }
  }
  return (
    <Button onClick={onClick} disabled={isLoading} className='w-auto sm:w-full'>
        Enroll for {formatPrice(price)}
    </Button>
  )
}

export default CourseEnrollButton