import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { Chapter, Course, UserProgress } from '@prisma/client'
import { redirect } from 'next/navigation';
import React from 'react'
import { CourseSidebarItem } from './CourseSideBarItem';

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[]
  };
  progressCount: number;
};

const CourseSideBar = async({course, progressCount} : CourseSidebarProps) => {

  const {userId} = auth();
  if(!userId) {
    return redirect("/")
  }

  const purchase = await db.purchase.findUnique({
    where : {
      userID_courseID : {
        userID : userId,
        courseID : course.id
      }
    }
  })
  return (
   <div className='h-full border-r flex flex-col overflow-y-auto shadow-sm '>
    <div className='p-8 flex-col border-b'>
      <h1 className='font-semibold'>{course.title}</h1>
      { /*Check purchase and add the progress*/}
    </div>
    <div className='flex w-full flex-col'>
    {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}


    </div>
  
   </div>
  )
}

export default CourseSideBar