import { firestore } from '@/firebase';
import { decrementing, incrementNumber } from '@/functions/functions';
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

interface RouteContext {
    params: Record<string, string>; // Ensure this property exists
  }
  
// for sending request of user to server

export async function POST(req: Request,  context: RouteContext & { params?: Promise<any> } & { params?: Promise<any> }) {

    // for returning if method is not post
    if (req.method != "POST") {
        return NextResponse.json({ message: "Method is not allowed" })
    }

    const data = await req.json()

    const { name, uid, title, content, category, email, emoji } = data

    if (!title || !content || !category) {
        return NextResponse.json({ message: "All Fields Are Required", statusCode: 500 })
    }

    if(title.length>25) {
        return NextResponse.json({ message: "Please keep your title under 25 characters.", statusCode: 500 })
    }

    // making unique id for every note

    const id = `${uid}_${new Date().getTime()}`

    try {

        // first we have to check whether user already exist or not so previous data don't overwritten with setDoc again

        const document = await getDoc(doc(firestore, 'users', uid))

        if (!document.exists()) {
            await setDoc(doc(firestore, 'users', uid), {
                name: name,
                email: email,
                uid: uid,
                important: 0,
                normal: 0,
                personal: 0,
                work: 0,
                idea: 0,
                createdAt: serverTimestamp()
            })
        }

        // if user exist then increase specific category collection number 

        await incrementNumber(uid, category)

        // then we'll start adding unique subcollection of all notes by taking refernce of category and their respective notes in them
        await setDoc(doc(firestore, 'users', uid, category, id), {
            title: title,
            category: category,
            content: content,
            noteId: id,
            emoji: emoji,
            createdAt: serverTimestamp()
        })

        console.log(data)
        return NextResponse.json({ message: "Note has been added successfully", statusCode: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Error while adding note" + error, statusCode: 500 })
    }
}

// for getting data from server and delievering to user

export async function GET(req: Request, context: RouteContext & { params?: Promise<any> }) {
    try {
        if (req.method !== "GET") {
            return NextResponse.json({ message: "Method Not Allowed" })
        }

        const id = req.headers.get("id")
        if (!id) {
            return NextResponse.json({ message: "ID is required" })
        }

        // Reference to the user's notes subcollection
        const notesRef = doc(firestore, `users/${id}`)

        // Fetch all documents in the subcollection
        const querySnapshot = await getDoc(notesRef)

        return NextResponse.json({ data: querySnapshot.data() })

    } catch (error) {
        console.error("Error Fetching Notes:", error);
        return NextResponse.json({ message: "Error Fetching Notes", error: (error as any).message }, { status: 500 });
    }
}

// for deleting document

export async function DELETE(req: Request, context: RouteContext & { params?: Promise<any> }) {

    try {
        if (req.method != 'DELETE') {
            return NextResponse.json({ message: "Method is not allowed" })
        }

        const body = await req.json()
        const { uid, noteId, coll } = body

        // taking reference of user's database and it's note

        const docRefs = doc(firestore, 'users', uid , coll, noteId)

        await deleteDoc(docRefs)
        await decrementing(uid, coll)

        return NextResponse.json({ message: "Note has been deleted successfully" })

    } catch (error) {
        return NextResponse.json({ message: "Error deleting note, Please try again later." + error })
    }

}
