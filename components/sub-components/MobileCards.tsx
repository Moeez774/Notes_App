import { ChevronDown, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import '../Style.css'
import { useRouter } from 'next/navigation'


interface Details {
    data: any,
    phrase: string,
    uid: string,
}

const MobileCards: React.FC<Details> = ({ data, phrase, uid }) => {

    const [showCont, setShowcont] = useState(false)

    const router = useRouter()

    const [loader, setLoader] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [warning, setWarning] = useState(false)

    // for deleting note in mobile

    const deleteNote = async () => {
        setShowcont(false)
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

    // for pushing user to note page

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

            {/* // for showing warning before deletion */}
            <div className='fixed top-0 left-0 items-center h-screen w-screen flex justify-center' style={{ zIndex: warning ? '210' : '-200' }}>
                <div className='bg-white shadow-2xl shadow-black flex flex-col justify-between gap-6 mx-3 text-center text-sm sm:text-base py-4 px-6 rounded-lg' style={{ transition: 'all 0.2s ease-in-out', transform: warning ? 'scale(1)' : 'scale(0.8)', opacity: warning ? '1' : '0' }}>
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

            <div className='flex flex-col gap-1'>
                <div className="mCard flex items-center w-[90vw] md:w-[36vw]">
                    <div className="mImg flex justify-center items-center text-xl sm:text-2xl md:text-xl">{data.emoji}</div>
                    <div className="mTextBox flex justify-between items-center">
                        <div className="mTextContent flex flex-col gap-1">
                            <p className="mH1 font-bold md:text-sm">{data.title}</p>
                            <h1 className="mSpan">{data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" }) : "Time Loading..."}</h1>
                        </div>
                        <div>
                            <ChevronDown onClick={() => setShowcont(!showCont)} className='cursor-pointer transition-all duration-300' style={{ transform: showCont ? 'rotateX(-180deg)' : 'rotateX(0deg)' }} size={20} color='white' />
                        </div>
                    </div>
                </div>

                {/* // showing content on button click */}
                <div className={`w-[90vw] flex flex-col gap-1 justify-between text-white bg-[#353535] ${showCont ? 'h-[11.8rem] py-4' : 'h-0 py-0'} px-4 transition-all duration-200 overflow-hidden md:w-[36vw]`} style={{ borderRadius: '20px', letterSpacing: '0.5px' }}>
                    <h1 className='mContent text-sm font-normal'>{
                        data.content.split('\n').map((paragraph: any, index: number) => {
                            // Return each paragraph wrapped in <p> tag
                            return <p className='text-sm' key={index}>{paragraph}</p>;
                        })}</h1>

                    {/* button for read more */}

                    <div className='flex justify-end items-center gap-2'>
                        <button>
                            <Trash2 size={15} className='save cursor-pointer svg text-[#b1b1b1]' onClick={() => {
                                setWarning(true)
                                document.body.style.overflowY = 'hidden'
                            }} />
                        </button>
                        <button className='px-3 text-xs active:bg-gray-200 active:text-black transition-all duration-300 py-1.5 rounded-xl bg-transparent border border-solid border-gray-200 text-white' onClick={pushToRead}>Read</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileCards
