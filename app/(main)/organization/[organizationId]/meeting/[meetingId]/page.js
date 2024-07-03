"use client"
import React, { useState } from 'react'
import {useParams} from 'next/navigation';
import { useUser } from 'context/UserContext';
import { StreamCall,StreamTheme } from '@stream-io/video-react-sdk';
import{useCallById} from "hooks/useCallbyId"
import MeetingSetup from "@/components/ui/Meeting/MeetingSetup"
import MeetingRoom from "@/components/ui/Meeting/MeetingRoom"


const page = () => {
    const {meetingId} = useParams()
    const {userinfo,loading} = useUser;
    const [isSetup ,setSetupComplete] = useState(false);
    const {call,isCallLoading} = useCallById();

    if(loading || isCallLoading) return <h1>Loading...</h1>

  return (
    <div className='w-full h-full'>
        <StreamCall call={call}>
            <StreamTheme>
                {
                    !isSetup?(
                        <MeetingSetup setSetupComplete={setSetupComplete}/>
                    ):(
                        <MeetingRoom/>
                    )
                }
            </StreamTheme>
        </StreamCall>
    </div>
  )
}

export default page