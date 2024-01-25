import { NavBarRoutes } from '@/components/NavBarRoutes';
import { Chapter, Course, UserProgress } from '@prisma/client'
import React from 'react'
import { CourseMobileSidebar } from './CourseMobileSideBar';

interface CourseNavbarProps {
    course : Course & {
        chapters : (Chapter & {
            userProgress : UserProgress[] | null;
        }) []
    };
    progressCount : number

}
const CourseNavBar = ({course,progressCount}: CourseNavbarProps) => {
  return (
  <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
    <CourseMobileSidebar course={course} progressCount={progressCount}/>
    <NavBarRoutes/>
  </div>
  )
}

export default CourseNavBar