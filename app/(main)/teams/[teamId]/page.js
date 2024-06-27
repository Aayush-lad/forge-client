"use client";

import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from 'axios';
import Loader from '@/components/ui/Loader';
import Modal from "@/components/ui/Modal";
import AddUserForm from "@/components/ui/AddUserForm";

import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';

const Page = () => {
    const { teamId } = useParams();


    const [openAddModal, setOpenAddModal] = useState(false);
    const [email, setEmail] = useState(null);
    const [activeTab, setActiveTab] = useState(1);

    const queryClient = useQueryClient();
    
    const getTeamDetails = async()=>{
        const response = await axios.get(`http://localhost:5000/team/${teamId}`);
        console.log('Fetched team details:', response.data);
        return response.data;
    }

    const fetchTeamMembers = async () => {
        const response = await axios.get(`http://localhost:5000/team/${teamId}/members`);
        console.log('Fetched team members:', response.data);
        return response.data;
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ['teamMembers', teamId],
        queryFn: fetchTeamMembers,
    });

    const addTeamMember = async (data) => {
        const token = localStorage.getItem("token");
        await axios.post(
            `http://localhost:5000/team/${teamId}/add-member`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    };

    const deleteTeamMember = async (deleteEmail) => {
        const data = { email: deleteEmail };
        const token = localStorage.getItem('token');
        console.log(data);
        const response = await axios.request({
            method: 'delete',
            url: `http://localhost:5000/team/${teamId}/delete-member`,
            data: data,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Delete response:', response);
    };

    const addMemberMutation = useMutation({
        mutationFn: addTeamMember,
        onSuccess: () => {
            console.log('Add member success');
            queryClient.invalidateQueries(['teamMembers', teamId]);
        },
    });

    const deleteMemberMutation = useMutation({
        mutationFn: deleteTeamMember,
        onSuccess: () => {
            console.log('Delete member success');
            queryClient.invalidateQueries(['teamMembers', teamId]);
        },
    });

    if (isLoading) return <div className='flex-grow z-10'><Loader /></div>;
    if (error) return <div>Error loading data</div>;

    return (
        <>

        {/* Team overview section */}

            <div className='flex flex-col  p-2 ml-3'>

       

                {/* Navigation tabs team overview | team projects list  | team management | team settings */}
                <div className='flex flex-row gap-2'>
                        <button className={`text-sm p-2 ${activeTab==1 ? "bg-green-500 rounded-lg text-white": " text-black "}`}  onClick={()=>setActiveTab(1)}>Team Overview</button>
                        <button className={`text-sm p-2 ${activeTab==2 ? "bg-green-500 rounded-lg text-white": " text-black "}`}  onClick={()=>setActiveTab(2)}>Team Management</button>
                        <button className={`text-sm p-2 ${activeTab==3 ? "bg-green-500 rounded-lg text-white": " text-black "}`}  onClick={()=>setActiveTab(3)}>Team Projects</button>
                        <button className={`text-sm p-2 ${activeTab==4 ? "bg-green-500 rounded-lg text-white": " text-black "}`}  onClick={()=>setActiveTab(4)}>Team Settings</button>            
                </div>                
          </div>





            <div className='p-2'>
                <h1 className='text-lg font-bold p-3'>Team Management</h1>
                <p className='text-gray-400 text-sm px-3'>Manage your team and your team permissions here</p>
            </div>
            <hr />

            <Modal isOpen={openAddModal} onClose={()=>setOpenAddModal(false)}>
                <AddUserForm onAdd={addMemberMutation.mutate} type="team"/>
            </Modal>
            <div className="container mx-auto py-10">
                <DataTable
                    columns={columns}
                    data={data}
                    onDelete={(email) => {
                        console.log('Deleting member:', email);
                        deleteMemberMutation.mutate(email);
                    }}
                    setOpenAddModal={setOpenAddModal}
                />
            </div>
        </>
    );
};

export default Page;
