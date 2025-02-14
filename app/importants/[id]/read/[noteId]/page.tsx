'use client'
import Note from '@/components/Note'
import { firestore } from '@/firebase'
import { collection, onSnapshot, Timestamp } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const page = () => {

  const [note, setNote] = useState<{
    title: string,
    content: string,
    noteId: string,
    createdAt: Timestamp,
    category: string,
    emoji: string,
  }>()

    const params = useParams()

    const noteId = params.noteId
    const id = params.id

    useEffect(() => {
      const getNote = async() => {
        let a = await fetch('/api/readNote', {
          method: "GET", headers: {
            "id": Array.isArray(id) ? id[0] : id || '',
            "noteId": Array.isArray(noteId) ? noteId[0] : noteId || '',
            "coll": "Important",
          }
        })

        let response = await a.json()
        setNote(response.data)
      }

      if(id!='') {

        // for running it in realtime mean getting note in realtime for detecting deletions also

        const collectionRef = collection(firestore, 'users', Array.isArray(id) ? id[0] : id || '', 'Important')

        const unSubscribe = onSnapshot(collectionRef, () => {
          getNote()
        })

        return() => unSubscribe()
      }
    }, [id, noteId])

  return (
    <>

    <div>
      <Note note={note} coll='Important' id={id} />
    </div>
    </>
  )
}

export default page
