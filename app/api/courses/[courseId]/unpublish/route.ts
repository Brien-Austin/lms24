import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH( req : Request , {params} : {params : {courseId : string}}){
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse('Unauthorized',{status : 400});
        }

        const course  =await  db.course.findUnique({
            where : {
                id : params.courseId,
                userId : userId
            },
            include : {
                chapters : {
                    include : {
                        muxData : true
                    }
                }
            }
        })

       

        if (!course){
            return new NextResponse('COURSE NOT FOUND ERROR', {status : 400})
        }

        const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);
        if(!course.title || !course.description || !course.imageUrl || !course.categoryID || !hasPublishedChapter ){
            return new NextResponse('Missing neccessary fields',{status : 400})


        }

        const unpublishedCourse = await db.course.update( {
            where : {
                id : params.courseId,
                userId : userId
            },
            data : {
                isPublished : false
            }

        })

        return NextResponse.json(unpublishedCourse)
    } catch (error) {
        console.log('[COURSE_UNPUBLISH_ERROR]', error);
        return new NextResponse('Internal Server Error',{status : 400})
        
    }
}