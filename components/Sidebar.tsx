'use client'
import React, { useEffect, useRef, useState } from 'react'
import MobileSideBar from './MobileSideBar'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, firestore } from '@/firebase'
import Button from './Button'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { MenuIcon } from 'lucide-react'

const Sidebar = () => {

  const [categories, setCategories] = useState<{ category: string }[]>([])
  const [id, setId] = useState('')
  const [isClicked, setClicked] = useState(false)

  // reference for menubar button for hiding popup on outside click excpet it

  const btnRef = useRef<HTMLDivElement | null>(null)

  const btnsText = ['Importants 🔥', 'Normals 📝', 'Personals 🔒', 'Works 📚', 'Ideas 💡']

  // getting id
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setId(user.uid)
      }
      else {
        setId('')
      }
    })
  }, [])

  // fecthing all categories for showing in sidebar
  useEffect(() => {
    const getCategories = async () => {

      let a = await fetch("/api/products", {
        method: "GET", headers: {
          "id": id,
        }
      })

      let response = await a.json()
      setCategories(response.data)
    }

    if (id != '') {

      const collRef = doc(firestore, 'users', id)

      const unSubscribe = onSnapshot(collRef, () => {
        getCategories()
      })

      return () => unSubscribe()
    }
  }, [id])

  return (
    <>

      {/* // for pc screens */}

      <div className='bg-gray-200 hidden fixed md:flex flex-col items-center gap-6 min-h-screen py-6 px-4 lg:px-5'>
        <div>
          <h1>Your Notes</h1>
        </div>

        {/* All Categories Buttons */}
        <div>
          {/* getting all categoires */}

          <div className='flex flex-col gap-4'>
            {btnsText.map((e, index) => {
              return <Button categories={categories} id={id} text={e} key={index} />
            })}
          </div>
        </div>
      </div>

      {/* for mobile screens */}

      <div ref={btnRef} className='bg-gray-200 fixed block md:hidden w-12 rounded-br-xl p-2.5 z-40'>
        <MenuIcon size={25} onClick={() => setClicked(!isClicked)} color='black' className='cursor-pointer' style={{ transition: 'all 0.3s ease-in-out', transform: isClicked ? 'rotate(90deg)' : 'rotate(0deg)' }} />
      </div>

      <div className='absolute z-30 md:hidden py-14 w-full h-screen' style={{ backgroundColor: isClicked ? 'rgba(0, 0, 0, 0.8)' : 'transparent', display: isClicked? 'block': 'none' }}>
        <MobileSideBar categories={categories} btnRef={btnRef} id={id} setClicked={setClicked} isClicked={isClicked} />
      </div>

    </>
  )
}

export default Sidebar
