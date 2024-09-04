import React from 'react'

const InnerContainer = ({ children }) => {
  return (
    <div className='block w-full m-0 px-4 bg-gray-200'>
        { children }
    </div>
  )
}

export default InnerContainer