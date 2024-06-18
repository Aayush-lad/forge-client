"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import Sidebar from '@/components/ui/Sidebar'
import { useRouter } from 'next/navigation'

const page = () => {

    const router = useRouter();
    const handle = () => {
        console.log("clicked")
        router.push("/dashboard")
    }

    return (
    <div className='flex gap-10'>
        <Sidebar/>
        <h1 className='ml-[100px]'>Project Page</h1>
        <button onClick={handle}>Go back</button>
    </div>
  
  )
}

export default page