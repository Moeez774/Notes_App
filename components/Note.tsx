import { Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import './Style.css'
import { ChevronLeft, Edit, Trash2 } from 'lucide-react';
import EditNote from './sub-components/Edit';
import { useRouter } from 'next/navigation';

interface Note {
    note: { title: string; content: string; noteId: string; createdAt: Timestamp; category: string; emoji: string } | undefined,
    id: string | string[] | undefined,
    coll: string,
}

const Note: React.FC<Note> = ({ note, id, coll }) => {

    const [isHovered, setHovered] = useState(false)
    const [isEditHovered, setEditHovered] = useState(false)
    const [content, setContent] = useState('')

    const [startEditing, setStartEditing] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [showBack, setBack] = useState(false)

    const router = useRouter()

    const [loader, setLoader] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')

    // for deleting note

    const deleteNote = async () => {
        setLoader(true)
        let a = await fetch('/api/products', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ uid: id, noteId: note?.noteId, coll: note?.category })
        })

        let response = await a.json()
        setMessage(response.message)
        setShowMessage(true)

        setTimeout(() => {
            setLoader(false)
            setShowMessage(false)
            router.push('/')
        }, 2000)
    }

    // for showing popup of editing
    const showPopUp = () => {
        setContent(note?.content || '')
        setStartEditing(true)
        document.body.style.overflow = 'hidden'
        setTimeout(() => {
            setPopUp(true)
        }, 10)
    }

    return (
        <>

            {/* // adding loader */}
            {loader && (
                <div className='fixed z-[100] top-0 left-0 items-center h-screen w-screen bg-[#0000007c] flex justify-center'>
                    {!showMessage && loader && <div className="loader-ellipsis"><div></div><div></div><div></div></div>}
                    {loader && showMessage && <div className='bg-white mx-3 text-center text-sm sm:text-base py-4 px-6 rounded-lg shadow-2xl'>
                        {message}
                    </div>}
                </div>)}

            {!note && (
                <div className='fixed z-[100] top-0 left-0 items-center h-screen w-screen flex justify-center'>
                <div className="lds-ellipsis"><div></div><div></div><div></div></div>
                </div>)}

            {startEditing && <div className='fixed flex justify-center z-[60] items-center w-screen h-full top-0 left-0' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                <div style={{ transition: 'all 0.3s ease-in-out', transform: popUp ? 'scale(1)' : 'scale(0.8)', opacity: popUp ? '1' : '0' }}>
                    <EditNote coll={coll} id={id} noteId={note?.noteId} setStartEditing={setStartEditing} setPopUp={setPopUp} content={content} setContent={setContent} />
                </div>
            </div>}

            <div className='absolute w-[94vw] justify-end md:justify-start md:w-auto flex z-0 gap-2 py-2 px-4 md:p-2'>

                {/* // for Going back */}

                <div>
                    <ChevronLeft size={15} className='cursor-pointer svg text-[gray]' onMouseEnter={() => setBack(true)} onClick={() => router.back()} onMouseLeave={() => setBack(false)} />
                    <div className='absolute my-2 py-2 w-16 px-2 cursor-default shadow-xl text-white rounded-lg bg-[#555555]' style={{ opacity: showBack ? '1' : '0', transition: 'all 0.2s ease-in-out', transform: showBack ? 'scale(1)' : 'scale(0.9)' }}>
                        <h1 className='text-xs'>Go Back</h1>
                    </div>
                </div>

                {/* // for deletion */}

                <div>
                    <Trash2 size={15} className='save cursor-pointer svg text-[gray]' onMouseEnter={() => setHovered(true)} onClick={deleteNote} onMouseLeave={() => setHovered(false)} />
                    <div className='absolute my-2 py-2 px-4 cursor-default shadow-xl text-white rounded-lg bg-[#555555]' style={{ opacity: isHovered ? '1' : '0', transition: 'all 0.2s ease-in-out', transform: isHovered ? 'scale(1)' : 'scale(0.9)' }}>
                        <h1 className='text-xs'>Delete</h1>
                    </div>
                </div>

                {/* // for editing */}
                <div>
                    <Edit size={15} className='save cursor-pointer svg text-[gray]' onMouseEnter={() => setEditHovered(true)} onClick={showPopUp} onMouseLeave={() => setEditHovered(false)} />
                    <div className='absolute my-2 py-2 px-4 cursor-default shadow-xl text-white rounded-lg bg-[#555555]' style={{ opacity: isEditHovered ? '1' : '0', transition: 'all 0.2s ease-in-out', transform: isEditHovered ? 'scale(1)' : 'scale(0.9)' }}>
                        <h1 className='text-xs'>Edit</h1>
                    </div>
                </div>

            </div>

            <div className='pt-16 px-4 md:pt-10 flex flex-col gap-6'>

                {/* Heading */}

                <div className='flex justify-between'>

                    <div>
                        <h1 className='text-3xl font-bold flex items-center'>{note?.title}</h1>
                    </div>

                    {/* Timestamp and delete button */}
                    <div className='flex gap-4 items-center'>

                        <div>
                            <h1 className='text-xs'>{note?.createdAt ? new Date(note?.createdAt.seconds * 1000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" }) : ""}</h1>
                        </div>

                    </div>

                </div>

                {/* //Main Content */}

                <div>
                    <h1 className='flex flex-col gap-4 text-sm font-normal'>{
                        note?.content.split('\n\n').map((paragraph: any, index: number) => {
                            // Return each paragraph wrapped in <p> tag
                            return <p className='text-base' key={index}>{paragraph}</p>;
                        })}</h1>
                </div>

            </div>

        </>
    )
}

export default Note
