"use client";
import React, { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ProjectMemberManagement = ({ data }) => {
  const { projectId, organizationId } = useParams();
  const router = useRouter();

  // delete project
  const deleteProject = async () => {
    const res = await axios.request({
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_API_URL}/project/delete/${projectId}`,
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if(res.data.status){

    toast.success(res.data.message);
    router.push(`/organization/${organizationId}/project/all`);
    }
    else{
      toast.error(res.data.message);
    }
  };

  const onDeleteUser = async (email) => {
    console.log(email);
    const res = await axios.request({
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}/delete-member`,
      data: {
        email: email,
      },
      headers:{
        Authorization:`bearer ${localStorage.getItem('token')}`
      }
    });

    if(res.data.status){
      toast.success(res.data.message);
      }
      else{
        toast.error(res.data.message);
      }

    console.log(res);
  };

  const client = useQueryClient();

  const deletemutation = useMutation({
    mutationFn: onDeleteUser,
    onSuccess: () => {
      client.invalidateQueries(["project", projectId]);
    },
  });

  const [email, setEmail] = useState("");
  // add member

  const addMember = async (email) => {
    console.log(email);

    const res = await axios.request({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}/add-member`,
      data: {
        email: email,
      },
      headers:{
        Authorization:`bearer ${localStorage.getItem('token')}`
      }
    });

    if(res.data.status){
      toast.success(res.data.message);
      }
      else{
        toast.error(res.data.message);
      }
  };

  const addmutation = useMutation({
    mutationFn: addMember,
    onSuccess: () => {
      client.invalidateQueries(["project", projectId]);
    },
  });

  return (
    <div className="p-3 m-3 flex flex-col">
      <h1 className="text-2xl font-bold">Project Settings</h1>
      <div className="flex flex-row-reverse justify-between">
        <button
          onClick={deleteProject}
          className="bg-red-500 text-white p-2 rounded-md max-h-[50px]"
        >
          Delete Project
        </button>
     
      {/* Add member using email */}

    
      <div className="  max-w-lg">
      <h1 className="text-md text-gray-500 font-bold m-2 ">
        Add Member using email
      </h1>
      <div className="flex  gap-2 max-w-lg">
        <input
          type="email"
          placeholder="Enter email to add member"
          className="border p-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={() => addmutation.mutate(email)}
          className="bg-green-500 text-white p-2 rounded-md"
        >
          Add Member
        </button>
        </div>
      </div>
      </div>
      <div>
        <DataTable
          data={data}
          columns={columns}
          onDelete={deletemutation.mutate}
        />
      </div>
    </div>
  );
};
export default ProjectMemberManagement;
