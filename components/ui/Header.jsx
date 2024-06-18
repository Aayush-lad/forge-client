"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const Header = ({openSide,setOpen,children}) => {


  console.log(openSide)
  return (
    <div className={`flex  shadow-md p-3 ${openSide ?"justify-end":"justify-between"} items-center 
    `} >
        {
        !openSide 
        &&(
          <div className='flex-start'>
        <Image src={"https://img.icons8.com/?size=100&id=3096&format=png&color=000000"} height={20} width={20} alt="menu" onClick={()=>setOpen(true)} />
        </div>
        )
        }

        <div className='flex'>
        <div>
            <h1 className='text-lg font-bold '>{children}</h1>
        </div>


        <select className='px-2' onChange={()=>{useRouter().push("/dashboard/organisationId")}} >
            <option className='p-2'>Default Organisation</option>
            <option className='p-2'>Organisation 1</option>
            <option className='p-2'>Organisation 2</option>
            <option className='p-2'>Organisation 3</option>
        </select>
        </div>


    </div>
  )
}

export default Header