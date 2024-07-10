"use client"
import {
    StreamVideo,
    StreamVideoClient,
    User,
  } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { useUser} from './UserContext';
import {tokenProvider} from "../actions/stream"
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY; 

  
  const StreamVideoProvider = ({children}) => {
    const [videoClient,setVideoClient] = useState(null);

    const {userinfo} = useUser();
    console.log(userinfo);

    useEffect(()=>{
      if(!userinfo) return;

      const client = new StreamVideoClient({ apiKey, user:{
        id: userinfo?._id,
        name:userinfo?.username || userinfo?._id
      }, tokenProvider:()=>tokenProvider(userinfo) });

      setVideoClient(client);

    },[userinfo])

    if(!videoClient) return <h1>Loading...</h1>;



    
    return (
      <StreamVideo client={videoClient}>
          {children}
      </StreamVideo>
      );
  };

    export default StreamVideoProvider;