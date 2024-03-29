import { IconBadge } from '@/components/IconBadge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs'
import { ArrowLeft, Eye, LayoutDashboard, Video, YoutubeIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import React from 'react'
import ChapterTitleForm from './_components/ChapterTitleForm';
import ChapterDescription from './_components/ChapterDescriptionForm';
import ChapterAccesForm from './_components/ChapterAccessForm';
import {  ChapterVideoForm } from './_components/ChapterImageForm';
import { Banner } from '@/components/banner';
import { ChapterActions } from './_components/ChapterActions';
import ChapterYoutubeUrl from './_components/ChapterYoutubeUrl';

const Chapter = async({params} : {params : {courseId : string, chapterId : string}}) => {
    const {userId} = auth();
    if(!userId) {
        return redirect("/")
    }

    const chapter = await db.chapter.findUnique({
        where : {
            id : params.chapterId,
            courseID: params.courseId
        },
        include : {
            muxData : true
        }
    })

    if ( !chapter ){
        return redirect("/")
    }

    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.youtubeUrl
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`
    const isComplete = requiredFields.every(Boolean)

    return (
        <>
        {!chapter.isPublished && ( 
            <Banner variant={"warning"} label='This chapter is unpublished.It will not be visible inside the course !'/>
        )}
        <div className='p-6 '>
            <div className='flex items-center justify-between'>
                <div className='w-full'>
                    <Link href={`/teacher/courses/${params.courseId}`}>
                        <div className='flex items-center text-sm hover:opacity-75 transition mb-6'>
                            <ArrowLeft className='h-4 w-4 mr-2'/>
                            Back to course setup
                        </div>
                    </Link>
                    <div className='flex items-center justify-between w-full'>
                        <div className="flex flex-col gap-y-2">
                            <h1 className='text-2xl font-medium'>
                                Chapters Creation
                            </h1>
                            <span>
                                Complete all fields {completionText}
                            </span>
                        </div>
                        <ChapterActions  disabled={!isComplete} courseId={params.courseId} chapterId={params.chapterId} isPublished={chapter.isPublished}/>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
                <div className='space-y-4'>
                    <div>
                        <div className='flex items-center gap-x-2'>
                            <IconBadge icon = {LayoutDashboard}/>
                            <h2 className='text-xl'>
                                Customize your chapter !
                            </h2>
                        </div>
                        <ChapterTitleForm initialData={chapter}
                            courseId={params.courseId}
                            chapterId={params.chapterId}/>
                        <ChapterDescription initialData={chapter} courseId={params.courseId} chapterId={params.chapterId}/>
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={Eye}/>
                            <h2 className="text-xl">
                                Access settings
                            </h2>
                        </div>
                        <ChapterAccesForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId}/>
                    </div>
                </div>
                <div className='space-y-4'>
                    <div>
                        <div className='flex items-center gap-x-2'>
                            <IconBadge icon = {YoutubeIcon}/>
                            <h2 className='text-xl'>
                                Add a Youtube Url
                            </h2>
                        </div>
                        <div>
                           <ChapterYoutubeUrl initialData={chapter} chapterId={params.chapterId}courseId={params.courseId}/>
                        </div>
                        
                    </div>
                    <div>
                       
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Chapter;
