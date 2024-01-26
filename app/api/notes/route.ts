import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Props {
    name : string , 
    notesUrl : string
}
export async function POST( req: Request ){
    try {
        const values : Props = await req.json();
        const  notes = await db.notes.create ( {
            data : {
                name : values.name,
                notesUrl : values.notesUrl
            }
        })

        return NextResponse.json(notes)
        
    } catch (error) {
        console.log('[NOTES_CREATION_ERROR]');
        return new NextResponse('Internal Server Error', {status: 400})
        
    }

}

