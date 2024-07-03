"use client";
'use client';
import { useEffect, useState } from 'react';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';


const MeetingSetup = ({setSetupComplete}) => {

    const call = useCall();

    if (!call) {
        throw new Error(
          'useStreamCall must be used within a StreamCall component.',
        );
      }
    

    const [isMicCamToggled, setIsMicCamToggled] = useState(false);

    useEffect(() => {
      if (isMicCamToggled) {
        call.camera.disable();
        call.microphone.disable();
      } else {
        call.camera.enable();
        call.microphone.enable();
      }
    }, [isMicCamToggled, call.camera, call.microphone]);



  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-black">
    <h1 className="text-center text-2xl font-bold">Setup</h1>
    <VideoPreview />
    <div className="flex h-16 items-center justify-center gap-3 flex-col mt-4">
        <div className='flex items-center space-x-3'>
      <label className="flex items-center justify-center gap-2 font-medium">
        <input
          type="checkbox"
          checked={isMicCamToggled}
          onChange={(e) => setIsMicCamToggled(e.target.checked)}
        />
        Join with mic and camera off
      </label>

      <div className='text-white'>
      <DeviceSettings/>
      </div>

      </div>
   
    <button
        className="rounded-md bg-green-500 px-4 py-2 text-white" 
        onClick={() => {
          call.join();

          setSetupComplete(true);
        }}
      >
        Join meeting
      </button>
    </div>


    </div>
  )
}

export default MeetingSetup