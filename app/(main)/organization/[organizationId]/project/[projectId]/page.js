//  project/[projectId] page
"use client"
import React, { useState } from "react";
import {  useQuery } from "@tanstack/react-query";
// import { columns } from "./columns";
// import { DataTable } from "./data-table";
import axios from "axios";
import Loader from "@/components/ui/Loader";
import { useParams } from "next/navigation";
import ProjectOverview from "@/components/ui/ProjectOverview"
import TaskManagement from "@/components/ui/TaskManagement";
import KanbanBoard from "@/components/ui/KanbanBoard";
import GanttChart from "@/components/ui/GanttChart"
import ProjectMemberManagement from "@/components/ui/ProjectMemberManagement";



const Page = () => {
  const [activeTab ,setActiveTab ] = useState(1);

  // fetch project by id

  const {projectId} = useParams();



  const fetchProject = async()=>{
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}`);
    return response.data;
  }

  const {data, error, isLoading} = useQuery({
    queryKey: ['project', projectId],
    queryFn: fetchProject,
  });

  if(isLoading){
    return <Loader />
  }

  if(error){
    return <h1>Something went wrong</h1>
  }

  return (
    <>
      <div className="flex flex-col  p-2 ml-3">
        {/* Navigation tabs team overview | team projects list  | team management | team settings */}
        <div className="flex flex-row gap-2 overflow-x-scroll  md:overflow-hidden">
          <button
            className={`text-sm p-2 ${
              activeTab == 1
                ? "bg-green-500 rounded-lg text-white"
                : " text-black "
            }`}
            onClick={() => setActiveTab(1)}
          >
          Project Overview
          </button>
          <button
            className={`text-sm p-2 ${
              activeTab == 2
                ? "bg-green-500 rounded-lg text-white"
                : " text-black "
            }`}
            onClick={() => setActiveTab(2)}
          >
            Project Member management
          </button>

          <button
            className={`text-sm p-2 ${
              activeTab == 5
                ? "bg-green-500 rounded-lg text-white"
                : " text-black "
            }`}
            onClick={() => setActiveTab(5)}>
              Task management
            </button>

          <button
            className={`text-sm p-2 ${
              activeTab == 3
                ? "bg-green-500 rounded-lg text-white"
                : " text-black "
            }`}
            onClick={() => setActiveTab(3)}
          >
            Kanban board
          </button>
          <button
            className={`text-sm p-2 ${
              activeTab == 4
                ? "bg-green-500 rounded-lg text-white"
                : " text-black "
            }`}
            onClick={() => setActiveTab(4)}
          >
            Gantt chart
          </button>

          
        </div>
      </div>
      {/* Project overview section */}
      {activeTab == 1 && (
        <ProjectOverview data={data.project}/>
      )}

      {/* Task management section */}
      {activeTab == 5 && (
        <TaskManagement data={data.project.tasks}/>
      )}
      {/* Kanban board section */}
      {activeTab == 3 && (
        <KanbanBoard tasks={data.project.tasks} projectId={projectId}/>
      )}
      {/* Gantt chart section */}
      {activeTab == 4 && (
        <GanttChart tasks={data.project.tasks} projectId={projectId} />
      )}

      {/* Project member management */}
      {
        activeTab==2 &&(
          <ProjectMemberManagement data={data.project.members}/>
        )
      }
    </>
  );
};

export default Page;
