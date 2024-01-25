import { getChapter } from '@/app/actions/get-chapter';
import YoutubePlayer from '@/components/YoutubePlayer';
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

  const isLocked =  false /*!chapter?.isFree && !purchase*/
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
            <YoutubePlayer isLocked={isLocked}url={chapter?.youtubeUrl}/>
          )
         }
         
          {/* <YouTubePlayer videoUrl={chapter?.youtubeUrl}/> */}


      

      </div>
    </div>
  )
}

export default ChapterIdPage