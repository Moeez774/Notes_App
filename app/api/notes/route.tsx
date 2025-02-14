import { firestore } from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { NextResponse } from "next/server";

interface RouteContext {
    params: Record<string, string>; // Ensure this property exists
  }


export async function GET(req: Request, context: RouteContext & { params?: Promise<any> }) {

    try {

        if(req.method!="GET") {
            return NextResponse.json({ message: "This Method is not allowed" })
        }
    
        // getting data from headers which will provided by frontend
        const id = req.headers.get("id")
        const coll: string | null = req.headers.get("collection")
    
        if(!id || !coll) {
            return NextResponse.json({ message: "ID and Collection Refernece are required for notes fetching" })
        }

        const collectionRef = collection(firestore, 'users', id, coll)
        const queryRef = query(collectionRef, orderBy("createdAt", "desc"))

        // getting all notes of specific collection

        const docs = await getDocs(queryRef)

        const allNotes = docs.docs.map(doc => doc.data())

        return NextResponse.json({ data: allNotes })

    } catch(error) {
        return NextResponse.json({ message: "Error while fetching user's notes" + error })
    }
}