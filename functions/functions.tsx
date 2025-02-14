// inrementing specific number of notes category based on addition

import { firestore } from "@/firebase";
import { doc, FieldValue, increment, updateDoc } from "firebase/firestore";

export async function incrementNumber(uid: string, category: string) {

    // first converting category into lower case so we can use specific object from user database object which will increase

    const obj = category.toLowerCase()

    const docRef = doc(firestore, 'users', uid)

    // getting doc
    await updateDoc(docRef, {
        [obj]: increment(1)
    })
}

// for decrementing of number of notes of specific collection

export async function decrementing(uid: string, category: string) {

    const obj = category.toLowerCase()

    const docRef = doc(firestore, 'users', uid)

    // getting doc
    await updateDoc(docRef, {
        [obj]: increment(-1)
    })
}