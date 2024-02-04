import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import React from 'react'
import AccessButton from './AccessButton'

interface Props{
    email : string,
    userId : string
    courseId : string
    access : boolean
    id : string

}
const ReqCard = async({email,courseId,userId,access,id} : Props) => {
  const courseName = await db.course.findUnique({
    where : {
      id : courseId,
      
    }
  })



  return (
   <>
   {
    !access &&
    ( <>
     <div className=" w-4/5 border p-3 flex justify-between   rounded items-center flex-wrap gap-2 ">
     <div>
     <h1 className='px-2 text-xs w-fit rounded  font-bold'>
        {courseName?.title}

      </h1>
        <h1 className='text-muted-foreground text-xs'>{email}</h1>
     </div>
    <AccessButton id={id} userID = {userId} courseID={courseId} />

    </div>

      </>
    ) 
}
   </>
  )
}

export default ReqCard