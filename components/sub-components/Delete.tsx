import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import '../Style.css'

interface Details {
    data: any,
    phrase: string,
    uid: string,
}

const Delete: React.FC<Details> = ({ data, phrase, uid }) => {

    const [cardHover, setCardHover] = useState(false)
    const [isHovered, setHovered] = useState(false)
    const [showCont, setCont] = useState(false)

    const router = useRouter()

    const [loader, setLoader] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [warning, setWarning] = useState(false)

    // sending request to server for deletion of note

    const deleteNote = async () => {
        setLoader(true)
        let a = await fetch('/api/products', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ uid: uid, noteId: data.noteId, coll: data.category })
        })

        let response = await a.json()
        setMessage(response.message)
        setShowMessage(true)

        setTimeout(() => {
            setLoader(false)
            setShowMessage(false)
            document.body.style.overflowY = 'auto'
        }, 2000)
    }

    // for navigating to read page for read more

    const pushToRead = () => router.push(`${uid}/read/${data.noteId}`)

    return (
        <>
            {/* // adding loader */}
            {loader && (
                <div className='fixed z-[220] top-0 left-0 items-center h-screen w-screen bg-[#0000007c] flex justify-center'>
                    {!showMessage && loader && <div className="loader-ellipsis"><div></div><div></div><div></div></div>}
                    {loader && showMessage && <div className='bg-white mx-3 text-center text-sm sm:text-base py-4 px-6 rounded-lg shadow-2xl'>
                        {message}
                    </div>}
                </div>)}

                {/* // for showing warning on deletion */}

            
               <div className='fixed top-0 left-0 items-center h-screen w-screen flex justify-center' style={{ zIndex: warning? '210': '-200' }}>
                    <div className='bg-white shadow-2xl shadow-black flex flex-col justify-between gap-6 mx-3 text-center text-sm sm:text-base py-4 px-6 rounded-lg' style={{ transition: 'all 0.2s ease-in-out', transform: warning? 'scale(1)': 'scale(0.8)', opacity: warning? '1': '0' }}>
                        <div>
                            <h1>Are you sure you want to delete this note?</h1>
                        </div>

                        <div className='flex justify-end gap-3'>
                            <button className='px-4 py-1.5 rounded-xl bg-[#1a1919] active:bg-black hover:bg-[#222121] transition-all duration-300 text-white' onClick={deleteNote}>Yes</button>
                            <button className='px-4 py-1.5 rounded-xl bg-[#1a1919] duration-300 hover:bg-[#222121] active:bg-black text-white' onClick={() => {
                                setWarning(false)
                                document.body.style.overflowY = 'auto'
                            }}>No</button>
                        </div>
                    </div>
                </div>

            <div className='flex'>
                <div className="card overflow-hidden active:scale-95" style={{ wordBreak: 'break-word' }} onMouseEnter={() => setCardHover(true)} onMouseLeave={() => setCardHover(false)}>
                    <div onClick={pushToRead} className={`img cursor-pointer ${cardHover ? 'justify-start items-start pt-10 pl-5 pr-3' : 'justify-center py-10 px-6 items-center'} text-lg text-white font-semibold`} style={{ background: cardHover ? 'white' : 'linear-gradient(#5e5d5d, #0d0d0e)', opacity: cardHover ? '1' : '1', display: showCont ? 'none' : 'flex', wordBreak: 'break-word', letterSpacing: '0.5px' }}>
                        {!cardHover && <h1>{phrase.split(" ")[0]}s</h1>}

                        {/* // showing content of note on hovering on card  */}
                        <div className='text-black' style={{ display: cardHover ? 'block' : 'none' }}>
                            <h1 className='content text-sm font-normal'>{
                                data.content.split('\n').map((paragraph: any, index: number) => {
                                    // Return each paragraph wrapped in <p> tag
                                    return <p className='text-sm' key={index}>{paragraph}</p>;
                                })}</h1>
                        </div>
                    </div>

                    {/* // card title and date, card title goes up one hover */}
                    <div className="text">
                        <p className={`h3 ${cardHover ? '-translate-y-[11.2rem]' : 'translate-y-0'} transition-all duration-200`}>{data.title.charAt(0).toUpperCase()}{data.title.substring(1)}</p>

                        <div className='flex items-center justify-between'>
                            <p className="p">
                                {data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" }) : "Time Loading..."}
                            </p>
                            <div className="p-3">
                                <Trash2 size={15} className='save cursor-pointer svg text-[gray]' onMouseEnter={() => setHovered(true)} onClick={() => {
                                setWarning(true)
                                document.body.style.overflowY = 'hidden'
                            }} onMouseLeave={() => setHovered(false)} />
                                <div className='absolute my-2 py-2 px-4 cursor-default shadow-xl text-white rounded-lg bg-[#0c0c0c77]' style={{ opacity: isHovered ? '1' : '0', transition: 'all 0.2s ease-in-out', transform: isHovered ? 'scale(1)' : 'scale(0.9)' }}>
                                    <h1 className='text-xs'>Delete</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Delete
