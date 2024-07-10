"use client";
import WhiteBoard from "@/components/Whiteboard/WhiteBoard"
import {
  LiveblocksProvider,
  
} from "@liveblocks/react/suspense";

import { useParams } from "next/navigation";


export default function Room() {
  const { Id } = useParams();
  return (
    <>

    <h1 className="text-center justify-center items-center font-bold text-green-600"> Share Whiteboard URL to collaborate in real time :{`${process.env.NEXT_PUBLIC_CLIENT_URL}/whiteboard/${Id}`}</h1>
    
    <LiveblocksProvider publicApiKey={process.env.NEXT_PUBLIC_LIVE_BLOCKS}>
          <WhiteBoard />
    </LiveblocksProvider>
    </>
  );
}