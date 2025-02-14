'use client'
import Template from '@/components/Template'
import { auth, firestore } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, onSnapshot } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

    const params = useParams()

    const [name, setName] = useState('')
    const [notes, setNotes] = useState([])

    const id = Array.isArray(params.id) ? params.id[0] : params.id || ''

    // getting user name
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                const userName = user.displayName?.split(" ", 1)
                if(userName) setName(userName[0])
            }
        else {
            setName('...')
        }
        })
    }, [])

    //getting all important notes
    useEffect(() => {
        const getNotes = async() => {
            let a = await fetch('/api/notes', {
                method: "GET", headers: {
                    "id": id,
                    "collection": "Idea"
                }
            })

            let response = await a.json()
            setNotes(response.data)
        }

// fucntion for showing relatime changes in specifc collection which note has been deleted

        if (id != '') {

            const collRef = collection(firestore, 'users', id, "Idea")

            const unSubscribe = onSnapshot(collRef, () => {
                getNotes()
            })

            return () => unSubscribe()
        }    }, [id])

  return (
    <div>
      <Template uid={id} name={name} phrase='Essential Ideas!' notes={notes} />
    </div>
  )
}

export default page
