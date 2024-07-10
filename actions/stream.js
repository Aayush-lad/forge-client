"use server"

import { StreamClient } from "@stream-io/node-sdk"
import {useUser} from "@/lib/context/UserContext"

const apiSecret = process.env.STREAM_SECRET_KEY;
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const tokenProvider = async(userInfo)=>{
    const client = new StreamClient(apiKey, apiSecret);
    const exp = Math.round(new Date().getTime()/1000 )+ 60*60;
    const issued  = Math.floor(Date.now()/1000) -60;
    const token = client.createToken(userInfo._id,exp,issued);
    return token;
}



