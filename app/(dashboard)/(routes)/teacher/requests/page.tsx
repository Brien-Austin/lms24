import { db } from '@/lib/db'
import React from 'react'
import ReqCard from './_components/ReqCard'

const Requests =async() => {
    const requests = await db.courseRequest.findMany(
      {
        where:{
          givenAccess : false,
        }
      }
    
    )

  return (
   <div className='flex flex-col gap-y-5 mt-4 px-10'>

   {requests.map((data)=>(
    <div key={data.id}>
    <ReqCard id={data.id} access = {data.givenAccess}  userId ={data.userId} email={data.userName} courseId = {data.courseId}/>
   
      </div>
   ))}
   </div>
  )
}

export default Requests