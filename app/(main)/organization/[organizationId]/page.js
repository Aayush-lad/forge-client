"use client";

import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from 'axios';
import Loader from '@/components/ui/Loader';
import Modal from "@/components/ui/Modal";
import AddUserForm from "@/components/ui/AddUserForm";
import UpdateRole from "@/components/ui/UpdateRole";
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const UserManagement = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [email, setEmail] = useState(null);


  const queryClient = useQueryClient();
  const { organizationId } = useParams();

  const fetchOrgMembers = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/organization/${organizationId}/members`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  };

  let { data, error, isLoading } = useQuery({
    queryKey: ['orgMembers', organizationId],
    queryFn: fetchOrgMembers,
  });

  const addOrgMember = async (data) => {
    const token = localStorage.getItem("token");
    data.organizationId = organizationId
    const res =await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/organization/add-member`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if(res.data.status){
      toast.success(res.data.message);
    }
    else{
      toast.error(res.data.message);
    }
  };

  const deleteOrgUser = async (deleteEmail) => {
    const data = { email: deleteEmail };
    const token = localStorage.getItem('token');
    const res = await axios.request({
      method: 'delete',
      url: `${process.env.NEXT_PUBLIC_API_URL}/organization/${organizationId}/delete-member`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    

    if(res.data.status){
      toast.success(res.data.message);
    }
    else{
      toast.error(res.data.message);
    }


  };

  const updateUser = async (data) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/organization/${organizationId}/update-role`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if(res.data.status){
      toast.success(res.data.message);
    }
    else{
      toast.error(res.data.message);
    }
  };

  const addMemberMutation = useMutation({
    mutationFn: addOrgMember,
    onSuccess: () => {
      queryClient.invalidateQueries(['orgMembers', organizationId]);
    },
  });

  const deleteMemberMutation = useMutation({
    mutationFn: deleteOrgUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['orgMembers', organizationId]);
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['orgMembers', organizationId]);
      setOpenEditModal(false);
    },
  });

  const onUpdate = (email) => {
    setEmail(email);
    setOpenEditModal(true);
  };

  if (isLoading) return <div className='flex-grow z-10'><Loader /></div>;
  if(error) return <div className='flex flex-col items-center justify-center '> 
  <Image src="/404.png" width={900} height={520}  />
  <p className='text-lg   md:text-2xl font-bold'>Something went wrong !!</p>
  </div>
  if(!data.response && !data.status) return <div className='flex flex-col items-center justify-center mt-3 '> 
  <Image src="/404.png" width={900} height={520}  />
  <p className='text-lg md:text-2xl font-bold'>{data.message}</p>
  </div>

   data = data?.response;

  return (
    <>
      {openAddModal && (
        <Modal isOpen={openAddModal} onClose={() => setOpenAddModal(false)}>
          <AddUserForm onAdd={addMemberMutation.mutate} />
        </Modal>
      )}

      {openEditModal && (
        <Modal isOpen={openEditModal} onClose={() => setOpenEditModal(false)}>
          <UpdateRole email={email} updateMutation={updateRoleMutation.mutate} />
        </Modal>
      )}

      <div className='flex flex-col gap-2 p-2 z-0 overflow-x-auto'>
        <div className='flex justify-between items-center p-2'>
          <h1 className='text-xl font-bold'>User Management</h1>
          <button className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700' onClick={() => setOpenAddModal(true)}>+ Add User</button>
        </div>

        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={data}
            onDelete={deleteMemberMutation.mutate}
            onUpdate={onUpdate}
          />
        </div>
      </div>
    </>
  );
};

export default UserManagement;
