import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function GET( req:Request){
    return new NextResponse("Its working ")
}




export async function PATCH( req:Request, {params} : {params: {courseId : string ,chapterId : string}}){
   try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId
      }
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseID: params.courseId,
      },
      data: {
        ...values,
      }
    });

      
      return NextResponse.json(chapter);
      
    
   } catch (error) {

    console.log('[COURSE_CHAPTERID_ERROR',error);
    return new NextResponse("CHAPTER_EDIT ERROR", {status : 500})
    
   }
}