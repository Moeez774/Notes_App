import React, { useState } from 'react'
import './Style.css'
import Delete from './sub-components/Delete'
import MobileCards from './sub-components/MobileCards'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Details {
    name: string,
    notes: any[],
    phrase: string,
    uid: string,
}

const Template: React.FC<Details> = ({ name, notes, phrase, uid }) => {

    const [showBack, setBack] = useState(false)
    const router = useRouter()

    return (
        <>

            {/* // for Going back */}

            <div className='absolute p-3'>
                <ChevronLeft size={25} className='cursor-pointer svg text-[gray]' onMouseEnter={() => setBack(true)} onClick={() => router.back()} onMouseLeave={() => setBack(false)} />
                <div className='absolute my-2 py-2 w-16 px-2 cursor-default shadow-xl text-white rounded-lg bg-[#555555]' style={{ opacity: showBack ? '1' : '0', transition: 'all 0.2s ease-in-out', transform: showBack ? 'scale(1)' : 'scale(0.9)' }}>
                    <h1 className='text-xs'>Go Back</h1>
                </div>
            </div>

            <div className='px-2 py-16 lg:px-6 lg:py-6 flex flex-col items-center flex-1 gap-16 overflow-y-auto'>
                <h1 className='text-center mx-6 text-2xl md:text-3xl font-semibold'>{name}{`'s`} {phrase}</h1>

                {/* Loader for showing if no note has been added yet */}

                {notes.length === 0 && <>
                    <div className="lds-ellipsis"><div></div><div></div><div></div></div>
                    <h1 className='text-sm text-center'>Create your first note to get started!</h1>
                </>}

                {/* Template for notes front */}

                {notes.length != 0 && <div className='hidden lg:flex flex-row flex-wrap justify-center gap-4'>
                    {notes.map((e, index) => {
                        return <Delete uid={uid} key={index} phrase={phrase} data={e} />
                    })}
                </div>}

                {notes.length != 0 && <div className='flex lg:hidden flex-col sm:flex-row sm:flex-wrap justify-center gap-2'>
                    {notes.map((e, index) => {
                        return <MobileCards uid={uid} key={index} phrase={phrase} data={e} />
                    })}
                </div>}

                {/* popup on hover */}


            </div>

        </>
    )
}

export default Template
