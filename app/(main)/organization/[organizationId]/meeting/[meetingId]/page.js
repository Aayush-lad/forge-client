"use client"
import React, { useState } from 'react'
import {useParams} from 'next/navigation';
import { useUser } from"@/lib/context/UserContext";
import { StreamCall,StreamTheme } from '@stream-io/video-react-sdk';
import{useCallById} from "@/lib/hooks/useCallbyId"
import MeetingSetup from "@/components/ui/Meeting/MeetingSetup"
import MeetingRoom from "@/components/ui/Meeting/MeetingRoom"
import Loader from '@/components/ui/Loader';


const page = () => {
    const {meetingId} = useParams()
    const {userinfo,loading} = useUser();
    const [isSetup ,setSetupComplete] = useState(false);
    const {call,isCallLoading} = useCallById();
    

    if(loading || isCallLoading) return <Loader/>

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