"use client"
import React ,{useEffect, useState} from 'react'
import Sidebar from '@/components/ui/Sidebar'
import Header from '@/components/ui/Header'
import { useRouter } from 'next/navigation'
import { useAuth } from 'context/AuthContext'
import Loader from "@/components/ui/Loader";


const layout = ({children}) => {

    const [openSide,setOpen] = useState(true)
  

  
    return (
      <div className="flex">

        <aside className="fixed top-0 left-0 h-full z-[1000000] ">
          <Sidebar openSide={openSide} setOpen={setOpen} className="fixed" />
        </aside>
    
        <main className="flex-grow flex-col ">
          <header>
            <Header openSide={openSide} setOpen={setOpen}>
              Current Organization :
            </Header>
          </header>
          <div className={`transition-all duration-500 ${openSide ? 'ml-[300px]' : 'ml-1'}`}>
              {children}
          </div>
        </main>
      </div>
    );
}

export default layout