import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Props {
    userId: string;
    courseId: string;
    userName: string;
}

export async function POST(req: Request) {
    try {
        const { userId, courseId, userName }: Props = await req.json();
        console.log(userId);
        console.log(userName);
        console.log(courseId);

        
        const existingRequest = await db.courseRequest.findFirst({
            where: {
                userId: userId,
                courseId: courseId,
            },
        });

        if (existingRequest) {
       
            return new NextResponse('User has already requested access for this course', { status: 400 });
        }

        
        const access = await db.courseRequest.create({
            data: {
                userId: userId,
                courseId: courseId,
                userName: userName,
            },
        });

        return NextResponse.json(access);
    } catch (error) {
        console.log('{REQUEST ACCESS ERROR}', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
