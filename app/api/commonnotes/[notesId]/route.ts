import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE ( req:Request , {params} :  { params:{notesId : string}}){
    try {
    
     
     const notes = await db.commonNotes.delete({
        where : {
            id : params.notesId

        },
        
    })

        return NextResponse.json('Deleted' , {status : 200});

    } catch (error) {

        console.log('Notes deleting error:', error)
        return new NextResponse('Internal Server Error', {status: 400})
        
    }
}