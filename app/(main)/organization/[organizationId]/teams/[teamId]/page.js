"use client";

import React, { act, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from 'axios';
import Loader from '@/components/ui/Loader';
import Modal from "@/components/ui/Modal";
import AddUserForm from "@/components/ui/AddUserForm";

import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';


const Page = () => {
    const { teamId ,organizationId} = useParams();


    const [openAddModal, setOpenAddModal] = useState(false);
    const [email, setEmail] = useState(null);
    const [activeTab, setActiveTab] = useState(1);
    const router = useRouter();
    const queryClient = useQueryClient();
    
    
    const getTeamDetails = async()=>{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/team/${teamId}`);
        console.log('Fetched team details:', response.data);
        return response.data;
    }

    const fetchTeamMembers = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/team/${teamId}/members`);
        console.log('Fetched team members:', response.data);
        return response.data;
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ['teamMembers', teamId],
        queryFn: fetchTeamMembers,
    });

    const {data:details} = useQuery({
        queryKey:['team-details',teamId],
        queryFn:getTeamDetails
    })

    const addTeamMember = async (data) => {
        const token = localStorage.getItem("token");
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/team/${teamId}/add-member`,
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
    
        console.log('Add member response:', res);
    };

    const deleteTeamMember = async (deleteEmail) => {
        const data = { email: deleteEmail };
        const token = localStorage.getItem('token');
        console.log(data);
        const res = await axios.request({
            method: 'delete',
            url: `${process.env.NEXT_PUBLIC_API_URL}/team/${teamId}/delete-member`,
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


    const deleteMutation = useMutation({
        mutationFn:async () => {
            console.log(teamId)
          const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/team/delete/${teamId}`, {
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
            router.push(`/organization/${organizationId}/teams/all`);
          },
        }
      );

    if (isLoading) return <Loader />
    if (error) return <div>Error loading data</div>;

    console.log(details);

    return (
        <>

        {/* Team overview section */}

            <div className='flex flex-col  p-2 ml-4'> 
                {/* Navigation tabs team overview | team projects list  | team management | team settings */}
                <div className='flex flex-row gap-2'>
                        <button className={`text-sm p-2 ${activeTab==1 ? "bg-green-500 rounded-lg text-white": " text-black "}`}  onClick={()=>setActiveTab(1)}>Team Overview</button>
                        <button className={`text-sm p-2 ${activeTab==2 ? "bg-green-500 rounded-lg text-white": " text-black "}`}  onClick={()=>setActiveTab(2)}>Team Management</button>
                        <button className={`text-sm p-2 ${activeTab==3 ? "bg-green-500 rounded-lg text-white": " text-black "}`}  onClick={()=>setActiveTab(3)}>Team Projects</button>
                        <button className={`text-sm p-2 ${activeTab==4 ? "bg-green-500 rounded-lg text-white": " text-black "}`}  onClick={()=>setActiveTab(4)}>Team Settings</button>            
                </div>                
          </div>

          {activeTab===2 &&(
            <>
            <div className='p-2'>
                <h1 className='text-lg font-bold p-3'>Team Management</h1>
                <p className='text-gray-400 text-sm px-3'>Manage your team and your team permissions here</p>
            </div>
            <hr />

            <Modal isOpen={openAddModal} onClose={()=>setOpenAddModal(false)}>
                <AddUserForm onAdd={addMemberMutation.mutate} type="team" teamId={teamId}/>
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
            )}

{/* team overview section */}
            { activeTab==1 &&(
                <>
                    <div className="max-w-4xl m p-6 bg-gray-100 shadow-lg rounded-lg gap-9">
                    <h1 className="text-xl font-bold mb-4">Team Overview</h1>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-5">
                      <h2 className="text-2xl font-semibold">{details._doc.name}</h2>
                      <p className="text-gray-600">Team ID: {details._doc._id}</p>
                      <p className="text-gray-600">Organization ID: {details._doc.organizationId}</p>
                      <p className="text-gray-600">Created At: {new Date(details._doc.createdAt).toLocaleString()}</p>
                      <p className="text-gray-600">Last Updated At: {new Date(details._doc.updatedAt).toLocaleString()}</p>
                      <h3 className="text-gray-600">Team Size : {details._doc.members.length}</h3>
                    </div>
                  </div>
                  

                  </>
            )}

            {/* Team projects */}

            {
                activeTab==3 &&(
                    <>
                                {details.projects.map((project) => (
                <div key={project._id} className="bg-blue-500 text-white shadow-lg rounded-lg p-6 cursor-pointer flex flex-col items-center justify-center min-w-[250px] w-1/3 ml-2">
                    <img src="https://img.icons8.com/?size=100&id=53428&format=png&color=FFFFFF" width={40} height={40} alt="icon" />
                    <h2 className="text-lg font-semibold mt-2">{project.name}</h2>
                    <p>{project.description}</p>
                    <p>Created at: {new Date(project.createdAt).toLocaleString()}</p>   
                    <p>Last Updated at: {new Date(project.updatedAt).toLocaleString()}</p>
                    <p>Status : {project.status}</p>
                   
                    <button onClick={()=> gotoProject(project._id) } className="bg-green-500 text-white p-2 rounded-lg mt-2">Go to Project</button>
                </div>
            ))}
                    </>


                    
                )}

                {
                    activeTab==4 &&(

                        <>
                                  <div className='p-2'>
                                    <div>
                <h1 className='text-lg font-bold p-3'>Team Settings</h1>
                <p className='text-gray-400 text-sm px-3'>Manage your team settings here</p>
                </div>
                <div>
                <h1 className='text-md font-bold p-3'>Delete Team</h1>
                <p className='text-gray-400 text-sm px-3'>Once deleted the team data is lost and cannot be recovered</p>
                <button onClick={()=>deleteMutation.mutate()} className='p-3 m-4 bg-red-500 text-white'>
                    Delete Team
                </button>
                </div>
            </div>
                        </>
                    )
                }
        </>
    );
};

export default Page;
