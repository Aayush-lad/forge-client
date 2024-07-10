import { AuthProvider } from 'context/AuthContext'
import React from 'react'

const layout = ({children}) => {
  return(
    <AuthProvider>
        {children}
    </AuthProvider>

  )
}

export default layout