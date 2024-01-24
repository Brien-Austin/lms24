import { db } from "@/lib/db";
import Mux from '@mux/mux-node'
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
const { Video} = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
)

export async function DELETE ( req : Request  , {params } :  {params : {courseId : string}}){
  try {
    
    
    const {userId} = auth();
    if ( !userId) {
      return new NextResponse('Unauthorized' , {status : 404})
    }

    const course = await db.course.findUnique({
      where : {
        id : params.courseId,
        userId
      },
      include : {
        chapters : {
          include : {
            muxData :true
          }
        }
      }
    })

    if (!course) {
      return new NextResponse("Not found", {status : 404})
    }

    for (const chapter of course.chapters) {
      if(chapter.muxData?.assetID){
        await Video.Assets.del(chapter.muxData.assetID)
      }
    }

    const deletedCourse = await db.course.delete({
      where : {
        id : params.courseId
      }
    })

    return NextResponse.json(deletedCourse)
  } catch (error) {
    console.log('Internal error ', error)
    return new NextResponse('Internal Server Error', {status : 500})
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized user", { status: 401 });
    }

    const { courseId } = params;
    const values = await req.json();
   

    const course = await db.course.update({
      where: {
        id: courseId,
        userId
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
