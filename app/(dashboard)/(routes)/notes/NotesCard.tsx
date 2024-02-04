import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

interface Props {
    name : string
    href: string
}
const NotesCard = ({name ,href} : Props) => {
  return (
    <div className='m-3 flex flex justify-between items-center bg-slate-100 p-5 rounded-md'>
       <h1>
        {name}
       </h1>
      <Link href = {href}>
      <Button variant={'outline'} size={'sm'} >
        View 
        
        </Button>
      </Link>


    </div>
  )
}

export default NotesCard