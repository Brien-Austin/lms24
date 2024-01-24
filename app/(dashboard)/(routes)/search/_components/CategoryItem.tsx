"use client"

import { cn } from '@/lib/utils'
import qs from 'query-string'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import {IconType} from 'react-icons'
import { title } from 'process'

interface categoryItemProps{
    label : string
    value? : string
    icon? : IconType

}

const CategoryItem = ({label,value,icon:Icon}:categoryItemProps) => {
    const pathName = usePathname();
    const router = useRouter();
    const searchparams = useSearchParams();

    const currentcategoryId = searchparams.get("categoryID");
    const currenttitle = searchparams.get("title");

    const isselected = currentcategoryId === value;

    const onClick = () =>{
        const url = qs.stringifyUrl({
            url : pathName,
            query : {
                title : currenttitle,
                categoryID : isselected ? null : value,
            }

        },{skipNull:true , skipEmptyString : true})
        router.push(url)
    }
  return (
  <button onClick={onClick} className={cn('py-2 px-3 text-sm border hover:border border-slate-200 rounded-full flex items-center hover:border-sky-700 transition', isselected && "border-sky-700 bg-sky-200/20 text-sky-800" //change style 
  )}>
    {Icon && <Icon size={20}/>}
    <div className='truncate'>
        {label}
    </div>
  </button>
  )
}

export default CategoryItem