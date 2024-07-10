import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const AccordionItem = ({href,children,onClick}) => {
  const router = useRouter();
  
  const handleClick = () => {
    if (!onClick) 
    router.push(href);
  else{
    onClick();
  }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer hover:bg-green-500 hover:rounded-lg hover:text-white w-full p-2">
    {children}
  </div>
  )
}

export default AccordionItem