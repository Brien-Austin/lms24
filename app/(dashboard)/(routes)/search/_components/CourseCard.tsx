
import CourseProgress from '@/app/(course)/courses/[courseId]/_components/CourseProgress'
import { IconBadge } from '@/components/IconBadge'
import { formatPrice } from '@/lib/formatCurrency'
import { BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface CourseCardProps{
    id : string
    title : string
    imageUrl : string
    chaptersLength : number,
    category : string | null
    price : number | null
    progress : number | null
}
const CourseCard = ({id , title , imageUrl , chaptersLength,category , price,progress} : CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
  <div className='group h-full p-2 overflow-hidden rounded-lg border'>
  <div className="carousel border rounded sm:w-full w-full relative aspect-video">
    <Image  unoptimized={true}className='object-cover' src={imageUrl} alt={title} fill />
    <h1>{title}</h1>

  </div>
  <div className='flex flex-col pt-2'>
    <h1 className='font-bold'>{title}</h1>

  </div>
  <p className='text-xs text-muted-foreground'>{category}</p>
<div className="my-3 flex items-center gap-x-3 text-sm">
  <div className='flex items-center gap-x-1'>
    <IconBadge size={'sm'} icon={BookOpen}/>
    <span>
      {chaptersLength } {chaptersLength === 1 ? "chapter" : "chapters"}
    </span>
  </div>
</div>
{<CourseProgress variant={progress === 100 ? "success" : "default" } size='sm' value={progress}/>}
<p className='font-medium'>{formatPrice(price)}</p>
  </div>
  

    </Link>
  )
}

export default CourseCard