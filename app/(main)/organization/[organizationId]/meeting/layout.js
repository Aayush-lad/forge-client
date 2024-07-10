import React from 'react'

import StreamVideoProvider from '@/lib/context/StreamClientProvider';

const layout = ({children}) => {
  return (
    <StreamVideoProvider>
        {children}
    </StreamVideoProvider>
  )
}

export default layout