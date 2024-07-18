"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { useForm,Controller } from "react-hook-form";
import {
  Form,
  FormMessage,
} from "@/components/ui/form"
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/lib/context/UserContext";


const Welcome = ({ step, setStep,closeModal }) => {
  const [orgId, setOrgId] = useState(null);
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [name, setName] = useState("");
  const form = useForm();
  const { register, handleSubmit, control ,reset, formState: { errors } } = form
  const [teams, setTeams] = useState([]);
  const queryClient = useQueryClient();
  const {toggleInvalidate} = useUser();



  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/organization/${orgId}/members`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        const memberOptions = response.data.response.map((member) => ({
          value: member._id,
          label: member.username,
        }));
        setMembers(memberOptions);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };


    // fetch teams

    const fetchTeams = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/team/${orgId}/teams`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        
        });
        console.log(response);
        const teamOptions = response.data.map(t => ({
          value: t._id,
          label: t.name??"default"
        }));
        setTeams(teamOptions);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    console.log(step);
    if(orgId){
      if(step==3)
    fetchMembers();
  if(step==4)
    fetchTeams();
    }
  }, [orgId,step]);

  const handleStep1 = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    setStep(2);

    // creating organisation
    const organisationName = document.getElementById("organisationName").value;
    const data = {
      name: organisationName,
    };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/organization/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data?.organization?._id) {
      setOrgId(res.data.organization._id);
    }
    toast.success(res.data.message);
    queryClient.invalidateQueries(['organizationlist']);
  };

  const handleStep2 = async (e) => {
    e.preventDefault();

    // adding member to organisation

    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;

    const token = localStorage.getItem("token");

    const data = {
      email,
      role,
      organizationId: orgId,
    };

    console.log(data);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/organization/add-member`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);

    toast.success(res.data.message);
  };

  const handleCreateTeam = async (e) => {

    try {
      const organizationId = orgId;
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/team/${organizationId}/create`, {
        name,
        organizationId,
        memberIds: selectedMembers.map((member) => member.value),
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });
      setStep(4);
      toast.success(response.data.message);
      
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };


  const handleStep4 = async (data) => {
    const { name, description, startDate, endDate, status, selectedTeams } = data;

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/project/${orgId}/create`, {
        name,
        description,
        startDate,
        endDate,
        status,
        organizationId:orgId,
        teamId: selectedTeams.map(team => team.value),
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Project created:', response.data);
      // Reset form after submission

      toast.success(response.data.message);
      reset();
      // Redirect or show success message
      toggleInvalidate((prev)=> !prev)
      closeModal()
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <>
      {step === 1 && (
        <div className="flex z-[50000000]">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
              Welcome to your dashboard
            </h1>
            <p className="mb-4">
              Just a few steps to go!!<br></br>
              You can create an organisation to get started.
            </p>
            <form className="flex flex-col space-y-4">
              <label
                htmlFor="organisationName"
                className="text-sm font-semibold"
              >
                Organisation Name
              </label>
              <input
                type="text"
                id="organisationName"
                className="p-2 border border-gray-500 rounded-md"
              />
              <button
                className="bg-green-500 text-white rounded-md p-2"
                onClick={(e) => handleStep1(e)}
              >
                Create Organisation
              </button>
            </form>
          </div>
          <div className="hidden md:block">
            <Image
              src="/organisation_banner.gif"
              alt="Banner"
              height={300}
              width={400}
            />
          </div>
        </div>
      )}

      {step == 2 && (
        <div className="flex z-[5000000000]">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
              Great!! Now lets add some members
            </h1>
            <p className="mb-4">
              You can always add new members using your organisation dashboard
            </p>

            {/* invite people to organisation */}
            <form className="flex flex-col space-y-4">
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="p-2 border border-gray-200 rounded-md"
              />

              <label htmlFor="role" className="text-sm font-semibold">
                Role
              </label>
              <select
                id="role"
                className="p-2 border border-gray-200 rounded-md"
              >
                <option value="Admin" className="p-1S">
                  Admin
                </option>
                <option value="ProjectManager">Project Manager</option>
                <option value="Member">Member</option>
              </select>
              <div className="flex gap-2">
                <button
                  className="bg-green-500 text-white rounded-md p-2"
                  onClick={(e) => handleStep2(e)}
                >
                  Add Member
                </button>
                <button
                  className="bg-green-500 text-white rounded-md text-center p-2"
                  onClick={() => setStep(3)}
                >
                 Next
                </button>
              </div>
            </form>
          </div>
          <div className="hidden md:block">
            <Image
              src="/organisation_banner.gif"
              alt="Banner"
              height={300}
              width={400}
            />
          </div>
        </div>
      )}

      {step == 3 && (
        <div className="flex z-[500000000000]">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Build your Team </h1>
            <p className="mb-4">
              You will be able to add and remove team members from your
              organization Create team and add members
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <div className="flex flex-col gap-1">
                <label>Team Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="p-1 ml-1 border border-gray-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Select Team Members</label>
                {console.log(members)}
                <Select
                  isMulti
                  options={members}
                  value={selectedMembers}
                  onChange={setSelectedMembers}
                  className="text-black border-1 border-gray-500"
                />
              </div>
              <button
                className="mt-[10px] bg-green-500 text-white rounded-md p-2"
                onClick={() => handleCreateTeam()}
              >
                Create Team
              </button>
            </form>
          </div>
          <div className="hidden md:block">
            <Image
              src="/organisation_banner.gif"
              alt="Banner"
              height={300}
              width={400}
            />
          </div>
        </div>
      )}

      {step == 4 && (
        <div className="flex">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
              Lets Create your First Project
            </h1>
            <p className="mb-4">
              You are almost done !!
            </p>

            <Form {...form}>

            <form onSubmit={handleSubmit(handleStep4)} className="flex flex-col gap-1">
        <div>
          <label>Name</label>
          <input
          className="label ml-1 p-1 border border-gray-400"
            type="text"
            {...register('name', { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Start Date</label>
          <input
           className="label ml-1 p-1 border border-gray-400"
            type="date"
            {...register('startDate')}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label >End Date</label>
          <input
           className="label ml-1 p-1 border border-gray-400"
            type="date"
            {...register('endDate')}
          />
        </div>
        <div>
          <label>Status</label>
          <select {...register('status')}  className="label ml-1 p-1 border border-green-400">
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
                options={teams}
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
      )}
    </>
  );
};

export default Welcome;
