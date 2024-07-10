"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image';
const layout = ({children}) => {

    const {organizationId}  = useParams();

    console.log(typeof organizationId);

    if(organizationId == "undefined"){
        console.log(organizationId)
        return <div className=' flex flex-col items-center justify-center h-full w-full p-2  mt-36'>
            <Image src="/org.png" width={300} height={340}/>
            <h1 className='text-3xl font-bold text-center'>You have not selected current organization</h1>
            <h1 className='text-2xl font-bold'>Please select an organization using the sidebar</h1>
        </div>
    }

  return (
    <>
        {children}
    </>
  )
}

export default layout