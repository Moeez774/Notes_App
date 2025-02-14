'use client'
import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import Button from './Button'
import { usePathname } from 'next/navigation'


interface Details {
    categories: any,
    isClicked: boolean,
    setClicked: Dispatch<SetStateAction<boolean>>,
    id: string,
    btnRef: RefObject<HTMLDivElement | null>,
}


const MobileSideBar: React.FC<Details> = ({ categories, isClicked, setClicked, id, btnRef }) => {

    const pathname = usePathname()

    const btnsText = ['Importants 🔥', 'Normals 📝', 'Personals 🔒', 'Works 📚', 'Ideas 💡']

    const [showNotes, setNotes] = useState(false)

    // reference for detecting outside Clicker_Script
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isClicked) {
            document.body.style.overflowY = 'hidden'
            setTimeout(() => setNotes(true), 100)
        }
        else if (!isClicked) {
            setNotes(false)
        }
    }, [isClicked])

    // detecting outside click so sidebar can be hidden

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if ((ref.current && !ref.current.contains(e.target as Node)) && (btnRef.current && !btnRef.current.contains(e.target as Node))) {
                setNotes(false)
                setTimeout(() => {
                    setClicked(false)
                    document.body.style.overflowY = 'auto'
                }, 250)
            }
        }

        window.addEventListener("mousedown", handleClick)

        return() => {
            window.addEventListener("mousedown", handleClick)
        }
    }, [])

    useEffect(() => {
        setClicked(false)
    }, [pathname])

    return (
        <>

            <div className='flex flex-col gap-2' >

                <div ref={ref} className='mx-6 relative z-30 w-48 flex flex-col gap-4 items-center h-[20em] bg-gray-200 rounded-xl p-4' style={{ transition: 'all 0.2s ease-in-out', opacity: showNotes ? '1' : '0', transform: showNotes ? 'scale(1)' : 'scale(0.9)' }}>

                    <div>
                        <h1>Your Notes</h1>
                    </div>

                    <div className='flex flex-col gap-3'>
                        {btnsText.map((e, index) => {
                            return <Button id={id} categories={categories} text={e} key={index} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileSideBar
