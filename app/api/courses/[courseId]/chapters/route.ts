import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST ( req : Request, {params} : {params : {courseId : string}}){
    try {

        const {userId} = auth();
        const {title} = await req.json();

        if(!userId){
            return new NextResponse("Unauthorized access", {status: 401})
        }

        const courseOwner = await db.course.findUnique({
            where : {
                id : params.courseId,
                userId : userId,    
            }
        })

        const lastChapter = await db.chapter.findFirst({
            where : {
             courseID : params.courseId,
            },
            orderBy : {
                position : "desc"
            }

        })

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const chapter = await db.chapter.create({
            data : {
                title,
                courseID : params.courseId,
                position : newPosition
            }
        })

        return NextResponse.json(chapter);
        
        if (!courseOwner) {
            return new NextResponse("Unauthorized access", {status: 401})
        }
    } catch (error) {
    console.log("CHAPTER CREATION ERROR ", error);
    }
}