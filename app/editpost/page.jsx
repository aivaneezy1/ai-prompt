import React from 'react'
import EditPost from '../Components/EditPost'
import AlertDelete from '../utils/AlertDelete'

const Editpage = () => {
  return (
    <div className='mt-10 ml-5'>
      <h2 className='head_text text-left text-secondary'>Edit Post</h2>
      <h2 className='text-gray-500 text-left mt-5 '>Edit your post however you want.</h2>
      <EditPost/>
    </div>
  )
}

export default Editpage
