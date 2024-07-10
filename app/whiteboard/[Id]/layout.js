import React from 'react'
import { AuthProvider } from '@/lib/context/AuthContext'

const layout = ({children}) => {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  )
}

export default layout