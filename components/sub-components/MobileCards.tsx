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
        }, 2000)
    }

    // for pushing user to note page

    const pushToRead = () => router.push(`${uid}/read/${data.noteId}`)

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
                <div className={`w-[90vw] flex flex-col gap-1 justify-between text-white bg-[#353535] ${showCont ? 'h-[11.8rem] py-4' : 'h-0 py-0'} px-4 transition-all duration-300 overflow-hidden md:w-[36vw]`} style={{ borderRadius: '20px', letterSpacing: '0.5px' }}>
                    <h1 className='mContent text-sm font-normal'>{
                        data.content.split('\n').map((paragraph: any, index: number) => {
                            // Return each paragraph wrapped in <p> tag
                            return <p className='text-sm' key={index}>{paragraph}</p>;
                        })}</h1>

                    {/* button for read more */}

                    <div className='flex justify-end items-center gap-2'>
                        <button>
                            <Trash2 size={15} className='save cursor-pointer svg text-[#b1b1b1]' onClick={deleteNote} />
                        </button>
                        <button className='px-3 text-xs active:bg-gray-200 active:text-black transition-all duration-300 py-1.5 rounded-xl bg-transparent border border-solid border-gray-200 text-white' onClick={pushToRead}>Read</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileCards
