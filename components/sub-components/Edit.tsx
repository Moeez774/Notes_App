import React, { Dispatch, SetStateAction, useState } from 'react'
import { ChevronLeft, Edit } from 'lucide-react'
import { Textarea } from '../ui/textarea'

interface Details {
    id: string | string[] | undefined,
    noteId: string | undefined,
    coll: string,
    setContent: Dispatch<SetStateAction<string>>,
    content: string,
    setStartEditing: Dispatch<SetStateAction<boolean>>,
    setPopUp: Dispatch<SetStateAction<boolean>>,
}

const EditNote: React.FC<Details> = ({ id, noteId, coll, content, setContent, setStartEditing, setPopUp }) => {

    const [loader, setLoader] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')

    // sending request to server for updating note
    const editNote = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoader(true)
        e.preventDefault()
        let a = await fetch('/api/readNote', {
            method: "POST", headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id, noteId: noteId, content: content, coll: coll })
        })

        let response = await a.json()
        setMessage(response.message)
        setShowMessage(true)

        setTimeout(() => {
            setLoader(false)
            setShowMessage(false)
            setStartEditing(false)
            setPopUp(false)
        }, 2000)
    }

    // for hiding pop up of editing screen

    const hidePopup = () => {
        setStartEditing(false)
        setPopUp(false)
    }

    return (
        <>
            {/* // adding loader */}
            {loader && (
                <div className='fixed z-[100] items-center h-[85.5vh] rounded-lg w-[90vw] sm:w-[35em] flex justify-center'>
                    {!showMessage && loader && <div className="lds-ellipsis"><div></div><div></div><div></div></div>}
                    {loader && showMessage && <div className='bg-white mx-3 text-center text-sm sm:text-base py-4 px-6 rounded-lg shadow-2xl'>
                        {message}
                    </div>}
                </div>)}

            <form onSubmit={editNote} className="bg-white w-[90vw] sm:w-[35em] p-6 rounded-lg shadow-2xl">

                <div className="mb-4">
                    <Textarea autoFocus
                        rows={5} value={content} onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter your content"
                        id="content" className='resize-none h-[70vh] text-sm' />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-[#131212] hover:bg-[#1d1b1b] text-white font-semibold transition-all duration-30 py-2 text-sm px-6 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                        Save
                    </button>

                    {/* for hiding popup of eiditng screen */}
                    <button className='flex items-center active:scale-95 transition-all duration-300 cursor-pointer' onClick={hidePopup}>
                        <ChevronLeft size={20} color='gray' />
                        <h1 className='text-sm text-[gray]'>Exit</h1>
                    </button>
                </div>
            </form>
        </>
    )
}

export default EditNote
