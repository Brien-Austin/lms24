"use client"

import { BadgeInfo, BarChart, Compass, Layout, List, LockKeyhole, Notebook, Shield } from "lucide-react"
import SideBarItem from "./SideBarItem";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon : Layout,
        label : 'Dashboard',
        href : '/'
    },
    {
        icon : Compass,
        label : 'Browse',
        href : '/search'
    }, {
        icon : LockKeyhole,
        label : 'Admin',
        href : "/admin"
    }
]
const adminRoutes = [
   
    {
        icon : List,
        label : 'Courses',
        href : '/teacher/courses'
    },
    {
        icon : BarChart,
        label : 'Analytics',
        href : '/teacher/analytics'
    }, 
    {
        
        icon : BadgeInfo,
        label : 'Course Requests',
        href : '/teacher/requests'
    },
    {
        icon : Notebook,
        label : 'Notes',
        href : '/teacher/notes'
    },
]
export default function SideBarRoutes() {
   
    const pathname = usePathname();
    const isTeacher = pathname?.includes("/teacher")
    const routes = isTeacher ? adminRoutes : guestRoutes;
 
    return (
        <div className="flex flex-col w-full">
           {
            routes.map(
                (route)=>(
                  <SideBarItem 
                  key = {route.href}
                  icon = {route.icon}
                  label = {route.label}
                  href = {route.href}/> 

               
                )
            )
           }

        
        </div>
    )
}