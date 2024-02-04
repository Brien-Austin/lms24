import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import NotesCard from './NotesCard';

const Notes = async() => {
    const {userId} = auth();
    if(!userId) return redirect('/')
    const notes = await db.commonNotes.findMany();
    console.log(notes)
  return (
    <>
    {
        notes.length === 0 ?  (
            <>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                <h1 className="text-md text-muted-foreground">
                    No notes right now !
                </h1>

            </div>
            </>
        ) : 
        (
          <>
          {
            notes.map( ( data )=>(
           <div key={data.id} className='flex flex-col gap-5 '>
                 <NotesCard key={data.id} name={data.name} href={data.url}/>

           </div>
            ))
          }
          </>
        )
    }
    </>
  )
}

export default Notes