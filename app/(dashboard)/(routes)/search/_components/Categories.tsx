"use client"
import { Category } from '@prisma/client'
import React from 'react'


import {FcEngineering, FcFilmReel,FcMultipleDevices,FcMusic,FcOldTimeCamera,FcSalesPerformance,FcSportsMode} from 'react-icons/fc'

interface categoryProps{
    items : Category[]

}
import { IconType } from 'react-icons/lib'
import CategoryItem from './CategoryItem'

const iconMap : Record<Category["name"] , IconType> = {
    "Music" : FcMusic,
    "Photography" : FcOldTimeCamera,
    "Fitness" : FcSportsMode,
    "Accounting" : FcFilmReel,
    "Computer Science" : FcMultipleDevices,
    "Filming" : FcFilmReel,
    "Engineering" : FcEngineering

}
const Categories = ({items} : categoryProps) => {
  return (
    <div className="flex items-center overflow-x-auto gap-x-2 pb-2">
        {items.map((item)=>(
            <CategoryItem key = {item.id} label={item.name} icon={iconMap[item.name]} value={item.id}/>
        ))}
    </div>
  )
}

export default Categories