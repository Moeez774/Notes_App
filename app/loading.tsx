import React from 'react'
import '../components/Style.css'

const loading = () => {
  return (
    <div className='absolute top-0 left-0 items-center h-screen w-screen bg-gray-100 flex justify-center'>
    <div className="lds-ellipsis"><div></div><div></div><div></div></div>
    </div>
  )
}

export default loading
