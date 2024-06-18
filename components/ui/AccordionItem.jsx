import React from 'react'
import Link from 'next/link'

const AccordionItem = ({href,children}) => {
  return (
    <Link href={href} className='hover:bg-green-500 hover:rounded-lg hover:text-white w-full p-2'>{children}</Link>
  )
}

export default AccordionItem