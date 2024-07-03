"use client"
import React,{useState,useEffect} from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter,useParams } from 'next/navigation';
import {useGetCalls} from "../../../hooks/useGetCalls";


const MeetingCallList = () => {
  // Fetch calls of users









  const fetchCalls = async () => {
    const response = await axios.get("http://localhost:5000/meeting/get-meetings", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    console.log(response.data);
    return response.data;
  };

  const router = useRouter();
  const {organizationId} = useParams();

  const handleJoin = async(callId)=>{

    router.push(`/organization/${organizationId}/meeting/${callId}`)
    
  }

  const { data, isLoading } = useQuery({ queryKey: ['calls'], queryFn: fetchCalls });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Meeting Calls</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((call) => (
          <div key={call._id} className="bg-white shadow-lg rounded-lg p-6">
            <div className="card-body">
              <h5 className="text-xl font-bold mb-2">{call.description}</h5>
              <p className="text-gray-700 mb-4">{new Date(call.startDate).toLocaleString()}</p>
              <p className="text-gray-700 mb-4">Participants: {call.participants.length}</p>
              <p className="text-gray-700 mb-4">Status:{call.status}</p>
              <p className="text-gray-700 mb-4">Call ID: {call.callId}</p>
              <button onClick={()=>handleJoin(call.callId)}  className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200">Join</button>
            </div>
          </div>
        ))}
      </div>

      <div>
      
      





      </div>
    </div>
  );
};

export default MeetingCallList;
