"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname , useRouter} from "next/navigation"
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./SearchInput";


export  const NavBarRoutes = () =>{
    const pathname = usePathname();
    const router = useRouter();
    const onClick = () =>{
        setTimeout(() => {
            router.push('/teacher/courses');
        }, 5000)
    }

    const isTeacherPage = pathname?.startsWith('/teacher')
    const isUsersPage = pathname?.includes("/courses")
    const isSearch = pathname?.includes("/search")
    return (
        <>
        {isSearch && ( 
            <div className="hidden md:block">
                <SearchInput/>
            </div> 
        )}
      
        </>
    )
}