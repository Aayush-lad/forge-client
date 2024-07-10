import { AuthProvider } from '@/lib/context/AuthContext'
import React from 'react'

const layout = ({children}) => {
  return(
    <AuthProvider>
        {children}
    </AuthProvider>

  )
}

export default layout