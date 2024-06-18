import React from 'react'

const AccordionWrapper = ({children,open}) => {
  return (

    <>

    {

  open &&(
    <div className='flex flex-col font-sembold ml-3 open'>
        {children}
    </div>
  )
}
</>

  )
}

export default AccordionWrapper