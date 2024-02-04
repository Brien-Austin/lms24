import { db } from "@/lib/db"
import { NextResponse } from "next/server"
interface Props {
    name : string
    url : string
}
export async function POST( req: Request){
    try {
        const value : Props = await req.json();
        const notes = await db.commonNotes.create({
            data : {
                name  : value.name,
                url : value.url
            }
        })

        return NextResponse.json(notes);
        
    } catch (error) {
        console.log('Notes creation error:' + error)
        return new NextResponse('',{status : 400})
        
    }
}

export async function GET ( req:Request){
    try {
        return NextResponse.json(await db.commonNotes.findMany())
        
    } catch (error) {

        console.log('Notes fetching error:', error)
        return new NextResponse('Internal Server Error', {status: 400})
        
    }
}

