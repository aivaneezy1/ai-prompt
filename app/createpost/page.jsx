"use client"
import React,{ useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import CreatePost from '../Components/CreatePost'
const CreatePostpage = () => {

  return (
    <div>
      <CreatePost
      />
    </div>
  )
}

export default CreatePostpage
