"use client"
import { useUser } from"@/lib/context/UserContext";
import React,{useState} from 'react'
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '@/components/ui/Loader';
import Modal from '@/components/ui/Modal';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import {Form} from '@/components/ui/form';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

const page = () => {
    const {organizationId} = useParams();
    const {userinfo} = useUser();
    const queryClient = useQueryClient();
    const [open,setOpen]  = useState(false)
    const[teamsOptions,setTeamsOptions] = useState([]);

    // form
    const form = useForm();
    const { register, handleSubmit, control } = form;

    //  fetch teams
    const fetchTeams = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/team/${organizationId}/teams`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const options  = response.data.map(t => ({
            value: t._id,
            label: t.name??"default"
          }));
          setTeamsOptions(options);
        return response.data;
    }
    const {data:teams} = useQuery({
       queryKey: ['teams'],
       queryFn: fetchTeams});
    


    //  fetch user projects
    const fetchProjects = async () => {
      const data = {organizationId:organizationId}
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/project/${organizationId}/${userinfo._id}`,
            organizationId,
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    }

    let { data, error, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects,
    });

    // create project
    const createProject = async (data) => {
        const token = localStorage.getItem("token");
        data.organizationId = organizationId;
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/project/${organizationId}/create`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(res.data);
        
        if(res.data.status){
          toast.success(res.data.message);
        }
        else{
          toast.error(res.data.message);
        }
    };

    // delete project

    const deleteProject = async (projectId) => {
        const token = localStorage.getItem("token");
        const res = await axios.request({
            method: 'delete',
            url: `${process.env.NEXT_PUBLIC_API_URL}/project/delete/${projectId}`,
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
    }

    // create mutation

    const mutation = useMutation({mutationFn:createProject,
        onSuccess: () => {
            queryClient.invalidateQueries(['projects']);
        },
    });

    // delete mutation

    const deleteMutation = useMutation({mutationFn:deleteProject,
        onSuccess: () => {
            queryClient.invalidateQueries(['projects']);
        },
    });

    const handleCreateProject = (data)=>{
        const { name, description, startDate, endDate, status, selectedTeams } = data;

        const projData = {            
                name,
                description,
                startDate,
                endDate,
                status,
                organizationId:organizationId,
                teamId: selectedTeams.map(team => team.value),
              }

        mutation.mutate(projData);
        


    }

    const router = useRouter();
    const gotoProject = (projectId)=>{
        router.push(`/organization/${organizationId}/project/${projectId}`);
    }

    if (isLoading) {
        return <div>
            <Loader/>
        </div>;
    }

    if (error) {
        return <h1>Something went wrong</h1>;
    }



  return (
    <div>
        {/* Create Modal */}
        <Modal onClose={()=> setOpen(false)} isOpen={open}>
        <div className="flex">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
              Lets Create your First Project
            </h1>
            <p className="mb-4">
              You are almost done !!
            </p>

            <Form {...form}>

            <form onSubmit={handleSubmit(handleCreateProject)} className="flex flex-col gap-1">
        <div>
          <label>Name</label>
          <input
          className="label ml-1 p-1 border-black"
            type="text"
            {...register('name', { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Start Date</label>
          <input
           className="label ml-1 p-1 border-black"
            type="date"
            {...register('startDate')}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label >End Date</label>
          <input
           className="label ml-1 p-1 border-black"
            type="date"
            {...register('endDate')}
          />
        </div>
        <div>
          <label>Status</label>
          <select {...register('status')}  className="label ml-1 p-1 border-black">
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Teams</label>
         
          <Controller
            name="selectedTeams"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={teamsOptions}
              />
            )}
          />
        </div>
        <div className="flex gap-2">
        <button type="submit"  className="p-2 bg-green-500 rounded-lg mt-2 text-white">Create Project</button>
        <button onClick={()=>closeModal()}  className="p-2 bg-green-500 rounded-lg mt-2 text-white">Create Later</button>
        </div>
      </form>
              </Form> 
          </div>
          <div>
            <Image
              src="/organisation_banner.gif"
              alt="Banner"
              height={300}
              width={400}
            />
          </div>
        </div>
        </Modal>




        <h1 className='text-xl font-bold m-4'> MY PROJECTS</h1>
        <div className="flex flex-wrap gap-2 ml-3"  >
            {/* create card */}
            <div className="bg-green-500 text-white shadow-lg rounded-lg p-6 cursor-pointer flex flex-col items-center justify-center" onClick={()=>{setOpen(true)}}>
                <img src="https://img.icons8.com/?size=100&id=48387&format=png&color=FFFFFF" width={40} height={40} alt="icon" />
                 <h2 className="text-lg font-semibold mt-2">Create new project</h2>
            </div>

            {/* Render all the projects in form of cards */}

        

            {data.projects.map((project) => (
                <div key={project._id} className="bg-blue-500 text-white shadow-lg rounded-lg p-6 cursor-pointer flex flex-col items-center justify-center min-w-[250px]">
                    <img src="https://img.icons8.com/?size=100&id=53428&format=png&color=FFFFFF" width={40} height={40} alt="icon" />
                    <h2 className="text-lg font-semibold mt-2">{project.name}</h2>
                    <p>{project.description}</p>
                    <p>Created at: {new Date(project.createdAt).toLocaleString()}</p>   
                    <p>Last Updated at: {new Date(project.updatedAt).toLocaleString()}</p>
                    <p>Status : {project.status}</p>
                    <button onClick={() => deleteMutation.mutate(project._id)} className="bg-red-500 text-white p-2 rounded-lg mt-2">Delete</button>
                    <button onClick={()=> gotoProject(project._id) } className="bg-green-500 text-white p-2 rounded-lg mt-2">Go to Project</button>
                </div>
            ))}
            
        </div>
    </div>
  )
}

export default page