import React from 'react'
import Image from 'next/image'

const Logo = () => {
  return (
    <span >
         <Image src="/logo.png" height={70} width={135} alt="Logo"/>
    </span>
  )
}

export default Logo;