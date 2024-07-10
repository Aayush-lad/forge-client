"use client"

// All Teams page
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '@/components/ui/Loader';

const Page = () => {
  const queryClient = useQueryClient();
  const { organizationId } = useParams();
  const router = useRouter();

  // Fetch all teams within the organization user has access to
  const fetchTeams = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/team/${organizationId}/teams`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['user-teams', organizationId],
    queryFn: fetchTeams,
  });

  const deleteMutation = useMutation({
    mutationFn:async (teamId) => {
      const res =await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/team/delete/${teamId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if(res.data.status){
        toast.success(res.data.message);
      }
      else{
        toast.error(res.data.message);
      }
    },
      onSuccess: () => {
        queryClient.invalidateQueries(['user-teams', organizationId]);
      },
    }
  );
  const gototeam = (teamId) => {
    router.push(`/organization/${organizationId}/teams/${teamId}`);
  };
  if (isLoading) {
    return <Loader/>;
  }

  // if no teams

  if (data.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <h1 className='text-2xl font-bold'>No teams found</h1>
        <button onClick={() => router.push(`/organization/${organizationId}/teams/create`)} className='bg-blue-500 text-white p-2 rounded-lg mt-2'>Create a team</button>
      </div>
    );
  }
  return (
    <>
    <h1 className='text-xl font-bold m-4'> Teams</h1>  
    <div className='flex flex-col md:flex-row ml-2 p-3 gap-2'>
      {data.map((team) => (
        <div key={team._id} className="bg-blue-500 text-white shadow-lg rounded-lg p-6 cursor-pointer flex flex-col items-center justify-center min-w-[250px]">
          <img src="https://img.icons8.com/?size=100&id=53428&format=png&color=FFFFFF" width={40} height={40} alt="icon" />
          <h2 className="text-lg font-semibold mt-2">{team.name}</h2>
          <p>Created at: {new Date(team.createdAt).toLocaleString()}</p>
          <p>Last Updated at: {new Date(team.updatedAt).toLocaleString()}</p>
          <div className='flex flex-row-reverse  gap-x-2'>
          <button onClick={() => deleteMutation.mutate(team._id)} className="bg-red-500 text-white p-2 rounded-lg mt-2">Delete</button>
          <button onClick={() => gototeam(team._id)} className="bg-green-500 text-white p-2 rounded-lg mt-2">Go to team</button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Page;
