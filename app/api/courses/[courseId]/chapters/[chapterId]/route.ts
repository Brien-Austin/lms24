import { NextResponse } from "next/server";
import { db } from "@/lib/db";

import Mux from '@mux/mux-node'
import { auth } from "@clerk/nextjs";

export async function GET( req:Request){
    return new NextResponse("Its working ")
}

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);




export async function PATCH( req:Request, {params} : {params: {courseId : string ,chapterId : string}}){
   try {
    const {userId} = auth();
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

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterID: params.chapterId,
        }
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetID);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          }
        });
      }

      const asset = await Video.Assets.create({
        input: values.videoUrl,
        playback_policy: "public",
        test: false,
      });

      await db.muxData.create({
        data: {
          chapterID: params.chapterId,
          assetID: asset.id,
          playbackID: asset.playback_ids?.[0]?.id,
        }
      });
    }

      
      return NextResponse.json(chapter);
      
    
   } catch (error) {

    console.log('[COURSE_CHAPTERID_ERROR',error);
    return new NextResponse("CHAPTER_EDIT ERROR", {status : 500})
    
   }
}