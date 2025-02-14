'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface ButtonDetails {
  text: string,
  categories: any,
  id: string,
}

const Button: React.FC<ButtonDetails> = ({ text, categories, id }) => {

  const router = useRouter()

  const [number, setNumber] = useState(0)

  // getting number of notes of collection and getting link for specific collection of notes

  useEffect(() => {
    if(categories) {
    const key = text.substring(0, text.length-4).toLowerCase()
    setNumber(categories[key])
    }
  }, [text, categories])

  // go to specific page

  const push = () => {
    if(id!='') {
      router.push(`/${text.substring(0, text.length-3).toLowerCase()}/${id}`)
    }
    else if (id==='') {
      router.push('/register')
    }
  }


  return (
    <div>
      <button onClick={push}
        type="submit"
        className="bg-[#131212] px-2 items-center hover:bg-[#1d1b1b] w-36 md:w-32 text-white font-medium transition-all duration-30 py-2 text-sm rounded-lg focus:outline-none flex justify-between gap-1 focus:shadow-outline"
      >
        <h1 className='w-32 text-start'>{text}</h1>
        <h1 className='w-4 text-[#717171] text-xs'>{number===undefined? 0: number}</h1>
      </button>
    </div>
  )
}

export default Button
