"use client"
import React ,{useState} from 'react'
import Sidebar from '@/components/ui/Sidebar'
import Header from '@/components/ui/Header'


const layout = ({children}) => {

    const [openSide,setOpen] = useState(true)
  
  
    return (
      <div className="flex">
        
        <aside className="fixed top-0 left-0 h-full ">
          <Sidebar openSide={openSide} setOpen={setOpen} className="fixed" />
        </aside>
    
        <main className="flex-grow flex-col ">
          <header>
            <Header openSide={openSide} setOpen={setOpen}>
              Dashboard
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