"use client"

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Loader from '@/components/ui/Loader';

const Page = () => {

  const router = useRouter();


  const fetchForms = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/form/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['all-forms'],
    queryFn: fetchForms,
  });


  const gotoForm = (formId) => {
    router.push(`/forms/${formId}/formdashboard`);
  };
  if (isLoading) {
    return <Loader/>;
  }
  return (
    <>
    <h1 className='text-xl font-bold m-4'> Forms</h1>  
    <div className='flex flex-col md:flex-row ml-2 p-3 gap-2 flex-wrap'>
      {data.map((form) => (
        <div key={form._id} className="bg-blue-500 text-white shadow-lg rounded-lg p-6 cursor-pointer flex flex-col items-center justify-center min-w-[250px]">
          <img src="https://img.icons8.com/?size=100&id=53428&format=png&color=FFFFFF" width={40} height={40} alt="icon" />
          <h2 className="text-lg font-semibold mt-2">{form.name||form.title}</h2>
          <p>Created at: {new Date(form.createdAt).toLocaleString()}</p>
          <p>Last Updated at: {new Date(form.updatedAt).toLocaleString()}</p>
          <div className='flex flex-row-reverse  gap-x-2'>
          <button onClick={() => gotoForm(form._id)} className="bg-green-500 text-white p-2 rounded-lg mt-2">Go to form</button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Page;
