import { getChapter } from '@/app/actions/get-chapter';
import CourseEnrollButton from '@/components/CourseEnrollButton';
import YoutubePlayer from '@/components/YoutubePlayer';
import { Banner } from '@/components/banner';
import { Preview } from '@/components/ui/preview';
import { Separator } from '@/components/ui/separator';
import { auth } from '@clerk/nextjs'

import { redirect } from 'next/navigation';
import React from 'react'


const ChapterIdPage = async({params} : {params : {courseId : string,chapterId : string}}) => {
  const {userId} = auth();
  if(!userId) {
    return redirect('/')
  }

  const {
    chapter , course , muxData,attachments,nextChapter,purchase,userProgress
  } = await getChapter({
    userId,chapterId:params.chapterId,courseId:params.courseId
  })

  const isLocked =!chapter?.isFree && !purchase
  const completeOnEnd = !!purchase && !userProgress?.isCompleted
  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant='success'label="You already completed this chapter ..."/>
      )}
       {isLocked && (
        <Banner variant='warning'label="You need to purchase this course to watch the course"/>
      )}
      
      <div className=' w-full'>
         {
          chapter?.youtubeUrl !== null && (chapter?.youtubeUrl !==undefined) && (
            <YoutubePlayer
            chapterId={chapter.id}
          
            courseId = {params.courseId}
            title={chapter.title}
            description={chapter?.description}
            nextChapterId={nextChapter?.id}
            completeOnEnd = {completeOnEnd}
             isLocked={isLocked}
             url={chapter?.youtubeUrl}/>
          )
         }
          <div className='p-8 flex flex-col  gap-8'>
      <h1 className="font-medium text-xl">
      {chapter?.title}
      </h1>
      {purchase ? ( <>
      {/*Add course progress button*/}
      </>) : ( <>
      <CourseEnrollButton courseId = {params.courseId} price={course?.price!}/>
      </>)}
      <Separator/>
      <h1 className="text-muted-foreground">
        {chapter?.description !==null && chapter?.description !== undefined && (
          <>
          {<Preview value={chapter.description}/>}
          </>
        )}
      </h1>
 
    {!!attachments.length && (
      <>
      <Separator/>
      <div>
      <h1 className="text-xl font-medium">
            Attachments
          </h1>
        {
          
          attachments.map((notes)=>(

            <a href={notes.url} key={notes.id}>
              <p className='text-xs p-3 truncate bg-blue-200 rounded mt-3 '>{notes.name}</p>
              </a>
          ))
        }
      </div>
      </>
    )}
  
      
    </div>
    
         
          {/* <YouTubePlayer videoUrl={chapter?.youtubeUrl}/> */}


      

      </div>
    </div>
  )
}

export default ChapterIdPage