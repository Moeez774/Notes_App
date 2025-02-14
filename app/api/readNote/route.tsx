import { firestore } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Repeat1 } from "lucide-react";
import { NextResponse } from "next/server";

interface RouteContext {
    params: Record<string, string>; // Ensure this property exists
}

// getting one specific note on user request to server for showing in read section

export async function GET(req: Request, context: RouteContext & { params?: Promise<any> } & { params?: Promise<any> }) {

    
    try {

        // for checking method wether it is valid or not

        if (req.method != "GET") {
            return NextResponse.json({ message: "Method is not allowed" })
        }

        const id = req.headers.get("id")
        const coll = req.headers.get("coll")
        const noteId = req.headers.get("noteId")

        // for checking id

        if (!id || !coll || !noteId) {
            return NextResponse.json({ message: "User data required for accessing note" })
        }

        // getting note

        const noteRef = doc(firestore, 'users', id, coll, noteId)

        const getdocument = await getDoc(noteRef)

        return NextResponse.json({ data: getdocument.data() })

    } catch (error) {
        return NextResponse.json({ message: "Error Fetching Note, Please try again" })
    }
}

// for updating note on user request to server

export async function POST(req: Request, context: RouteContext & { params?: Promise<any> }) {

    // for cathing any error initially

    try {

    if(req.method!="POST") {
        return NextResponse.json({ messsage: "This method is not allowed" })
    }

    const body = await req.json()
    const { id, noteId, content, coll } = body

    if(id==='' || noteId==='' || content==='' ) {
        return NextResponse.json({ message: "Please fill content field" })
    }

    // taking refernce of doc and updating it

    const docRef = doc(firestore, 'users', id, coll, noteId)

    await updateDoc(docRef, {
        content: content
    })

    return NextResponse.json({ message: "Note edited successfully" })

} catch(error) {
    return NextResponse.json({ message: "Error updating note, Please try again later." })
}


}