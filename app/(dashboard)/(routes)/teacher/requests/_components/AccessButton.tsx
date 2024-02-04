"use client"
import axios from 'axios'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface Props {
    courseID : string
    userID : string
    id : string

}

const AccessButton = ( {userID,courseID,id} : Props) => {
    const router = useRouter();
    const requestData = {
        id,
        userID,
        courseID,
      };
    
    const [loading,setLoading] = useState(false)
    const onClick = async() =>{
        try {
            setLoading(true);
            await axios.post(`/api/purchase`,requestData);
            toast.success('Given Access')
            router.refresh();

            
            
        } catch (error : any) {
            throw new Error(error)

            
        }
        finally{
            setLoading(false);

        }

    }

  return (
    <Button  disabled={loading} onClick={onClick}>
        Give Access

    </Button>
  )
}

export default AccessButton