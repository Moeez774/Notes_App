'use client'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Radios from './Radios'
import Selects from './Selects'
import '../Style.css'
import { useRouter } from 'next/navigation'

const Submit = () => {

  const [state, setState] = useState({
    name: '',
    category: '',
    content: '',
    uid: '',
    email: '',
    title: '',
    emoji: '',
  })

  const [loader, setLoader] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  const router = useRouter()

  // getting user info
  useEffect(() => {

    onAuthStateChanged(auth, (data) => {
      if (data) {
        setState((prev) => ({ ...prev, uid: data.uid || '', email: data.email || '', name: data.displayName || '' }))
      }
      else {
        setState((prev) => ({ ...prev, uid: '', email: '', name: '' }))
      }
    })
  }, [])

  //adding notes by using backend api

  const add = async (e: React.FormEvent<HTMLFormElement>) => {
    if(state.uid==='') {
      return router.push('/register')
    }
    
    setLoader(true)
    e.preventDefault();

    const data = {
      uid: state.uid,
      name: state.name,
      email: state.email,
      title: state.title,
      category: state.category,
      content: state.content,
      emoji: state.emoji,
    }

    // sending reuqest to server
    let a = await fetch('/api/products', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    let response = await a.json()

    // reseting inputs if note added succesfully not when error comes up
    if(response.statusCode===200) setState((prev) => ({ ...prev, title: '', category: '', content: '' }))
    setMessage(response.message)
    setShowMessage(true)

    setTimeout(() => {
      setLoader(false)
      setShowMessage(false)
    }, 2000)
  }

  return (
    <>
      {/* // adding loader */}
      {loader && (
        <div className='fixed z-[100] top-0 left-0 items-center h-screen w-screen bg-[#0000007c] flex justify-center'>
         { !showMessage && loader && <div className="loader-ellipsis"><div></div><div></div><div></div></div> } 
         { loader && showMessage && <div className='bg-white mx-3 text-center text-sm sm:text-base py-4 px-6 rounded-lg shadow-2xl'>
          {message}
          </div> }
        </div>)}

      <form onSubmit={add} className="bg-white w-[96%] sm:w-[36em] md:w-[37em] lg:w-[50em] p-6 rounded-lg shadow-2xl">

        <div className="mb-4 h-[4.5rem]">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <Input value={state.title} onChange={(e) => setState((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Enter title"
            type="text" className='text-sm md:text-base' />
          {state.title.length > 25 && <h1 className='text-xs ml-1' style={{ color: 'red' }}>Please keep your title under 25 characters.</h1>}
        </div>

        {/* // radio buttons for screen width above 640px */}
        <div className='hidden sm:block'>
          <div className='block text-gray-700 text-sm font-bold mb-2'>
            <h1>Category</h1>
          </div>
          <Radios state={state} setState={setState} />
        </div>

        {/* // Selects buttons for screen width below 640px */}
        <div className='sm:hidden'>
          <Selects state={state} setState={setState} />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
            Content
          </label>
          <Textarea value={state.content} onChange={(e) => setState((prev) => ({ ...prev, content: e.target.value }))}
            rows={5}
            placeholder="Enter your content"
            id="content" className='resize-none h-40 text-sm md:text-base' />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-[#131212] hover:bg-[#1d1b1b] text-white font-semibold transition-all duration-30 py-2 text-sm px-6 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </form>
    </>
  )
}

export default Submit
