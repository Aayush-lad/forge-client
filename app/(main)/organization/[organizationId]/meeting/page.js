"use client"

import MeetingActions from '@/components/ui/Meeting/MeetingActions';
import MeetingCallList from "@/components/ui/Meeting/MeetingCallList";
import RecordingList from "@/components/ui/Meeting/RecordingsList";
import React,{useRef} from 'react'
import Image from 'next/image'

const page = () => {

  const recordingRef = useRef(null);


  return (

    <>
      <MeetingActions ref={recordingRef}/>
      <MeetingCallList />
      <RecordingList ref={recordingRef}/>
    </>
  )
}

export default page