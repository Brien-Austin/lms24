import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Purchase {
    id : string
    userID : string,
    courseID : string
}

export async function POST(req : Request) {
    try {
        const values : Purchase = await req.json();

        const hasPurchased = await db.courseRequest.update({
            where : {
                id : values.id

            },
            data : {
                givenAccess : true

            }
        })
        

        const purchase = await db.purchase.create({
            data : {
                userID : values.userID,
                courseID : values.courseID
            }
        })
        return NextResponse.json(purchase)
      
    } catch (error) {
        return new NextResponse('Internal Server Error', {status : 400})
        
    }
}