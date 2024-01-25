import { getChapter } from '@/app/actions/get-chapter';
import YouTubePlayer from '@/components/YoutubePlayer';
import { Banner } from '@/components/banner';
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

  const isLocked = !chapter?.isFree && !purchase
  const completeOnEnd = !!purchase && !userProgress?.isCompleted
  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant='success'label="You already completed this chapter ..."/>
      )}
       {isLocked && (
        <Banner variant='warning'label="You need to purchase this course to watch the course"/>
      )}
      <div className='flex flex-col max-w-4xl mx-auto pb-20'>
        <div className='p-4'>
          <YouTubePlayer  isLocked={isLocked}videoUrl={chapter?.youtubeUrl}/>


        </div>

      </div>
    </div>
  )
}

export default ChapterIdPage