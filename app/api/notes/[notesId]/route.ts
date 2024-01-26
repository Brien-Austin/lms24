import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function PATCH( req: Request , {params} : {params : {notesId : string}}){
    try {
        const values = await req.json();
        const notes = await db.notes.update ( {
            where : {
                id : params.notesId
            },
            data : {
                ...values

            }

        })

        return NextResponse.json(notes)

    } catch (error) {
        console.log('[NOTES_UPDATION_ERROR]');
        return new NextResponse('Internal Server Error', {status: 400})
        
    }
}