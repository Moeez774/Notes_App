'use client'
import React, { useEffect, useState } from 'react'
import Button from './Button'
import Link from 'next/link'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { Home, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Header = () => {

  const [photo, setPhoto] = useState('')
  const [email, setEmail] = useState('')
  const [isHovered, setHovered] = useState(false)

  // using router pushing user back to homepage if user logout
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email || '')
        setPhoto(user.photoURL || '')
      }
      else {
        setEmail('')
        setPhoto('')
      }
    })
  }, [])

  return (
    <div className='h-20 relative z-50 bg-white flex items-center justify-between px-4 smx:px-6'>

      <div className='absolute w-full flex justify-center top-0 left-0 items-center h-20'>
        <h1 className='font-semibold cursor-default smx:text-lg md:text-xl text-center flex flex-col smx:flex-row gap-0.5'>Jot Now, <p>Think Later!</p></h1>
      </div>

      <div>
      <Link href='/' ><button className='flex sm:pl-4 relative z-20 gap-1 items-center'>
        <Home size={20} color='black' />
        <h1 className='text-sm hidden sm:block'>Home</h1>
      </button></Link>
      </div>

      {email != '' && (
        <div className='flex relative z-20 gap-3 items-center'>
          <div>
            <LogOut size={20}  className='cursor-pointer active:scale-95 text-[darkgray]' onMouseEnter={() => setHovered(true)} onClick={() => {
            signOut(auth)
            window.location.reload()
            router.push('/')
          }} onMouseLeave={() => setHovered(false)} />
            <div className='absolute my-2 py-2 px-4 cursor-default shadow-xl text-white rounded-lg bg-[#555555]' style={{ opacity: isHovered ? '1' : '0', transition: 'all 0.2s ease-in-out', transform: isHovered ? 'scale(1)' : 'scale(0.9)' }}>
                <h1 className='text-xs'>Logout</h1>
            </div>
        </div>
          {/* <LogOut className='transition-all duration-300 active:scale-90 cursor-pointer' size={20} onClick={() => {
            signOut(auth)
            window.location.reload()
          }} color='darkgray' /> */}
          <img className='w-8 md:w-10 rounded-full' src={photo} alt="" />
        </div>
      )}
      {email === '' && <Link href="/register" ><button className='transition-all relative z-20 duration-200 hover:text-[gray] active:text-[darkgray] text-xs md:text-sm'>Sign In</button></Link>}
    </div>
  )
}

export default Header
