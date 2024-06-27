import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import TaskCard from './TaskCard';
import AddTask from './AddTask';
import Modal from './Modal';


const TaskManagement = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [isOpen , setisOpen] = useState(false);
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const createTask = async (task) => {
    const response = await axios.post(`http://localhost:5000/project/6678ef15a8526ce6879662ef/add-task`, task);
    console.log(response.data);
  
    return response.data;
  };

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(['project', '6678ef15a8526ce6879662ef']);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // Filter and sort tasks
  const filteredAndSortedTasks = data
    .filter((task) => {
      return (
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterOption === '' || task.status === filterOption)
      );
    })
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'priority') {
        const priorities = { Low: 3, Medium: 2, High: 1 };
        return priorities[a.priority] - priorities[b.priority];
      } else if (sortOption === 'createdAt') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });

  return (


    <>

    <AddTask isOpen={isOpen} onClose={()=>setisOpen(false)} onCreateTask={createTaskMutation.mutate}/>

    <div className='m-2 p-3 shadow-xl'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-xl font-bold text-gray-800'>Task Management</h1>
          <p className='text-gray-500'>Manage your tasks with ease</p>
        </div>
      </div>

   

      <div>
        <div className="flex flex-col lg:flex-row">
          <div className='flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-md mr-4 flex-1'>
            <div className='flex items-center justify-center bg-blue-100 rounded-full'>
              <Image src='/totaltask.png' width={120} height={120} alt='task icon' />
            </div>
            <h1 className='text-2xl font-bold text-gray-800 mt-2'>20</h1>
            <p className='text-gray-500'>Total Tasks</p>
          </div>

          <div className='flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-md flex-1'>
            <div className='flex items-center justify-center bg-blue-100 rounded-full'>
              <Image src='/todotask.png' width={150} height={100} alt='task icon' />
            </div>
            <h1 className='text-2xl font-bold text-gray-800 mt-2'>10</h1>
            <p className='text-gray-500'>Todo Tasks</p>
          </div>

          <div className='flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-md mr-4 min-w-[200px] flex-1'>
            <div className='flex items-center justify-center bg-blue-100 rounded-full'>
              <Image src='/ongoingtask.jpeg' width={200} height={240} alt='task icon' />
            </div>
            <h1 className='text-2xl font-bold text-gray-800 mt-2'>10</h1>
            <p className='text-gray-500'>On Going Tasks</p>
          </div>

          <div className='flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-md flex-1'>
            <div className='flex items-center justify-center bg-blue-100 rounded-full'>
              <Image src='/completedtask.jpeg' width={200} height={240} alt='task icon' />
            </div>
            <h1 className='text-2xl font-bold text-gray-800 mt-2'>10</h1>
            <p className='text-gray-500'>Completed Tasks</p>
          </div>
        </div>
      </div>


      <div className='mt-4'>
        <input
          type='text'
          placeholder='Search tasks...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='p-2 border border-gray-300 rounded mr-4'
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className='p-2 border border-gray-300 rounded mr-4'
        >
          <option value=''>Sort by</option>
          <option value='name'>Name</option>
          <option value='priority'>Priority</option>
          <option value='createdAt'>Created At</option>
        </select>
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          className='p-2 border border-gray-300 rounded'
        >
          <option value=''>Filter by Status</option>
          <option value='To Do'>To Do</option>
          <option value='In Progress'>In Progress</option>
          <option value='Done'>Completed</option>
        </select>

        {/*  add task  button */}
        <button className='p-2 bg-blue-500 ml-3 text-white rounded-lg' onClick={()=>setisOpen(true)}>
          Add task
        </button>
      </div>

      {data?.length ? (
        <div className='mt-4 flex flex-wrap'>
          {filteredAndSortedTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <>
          <p>No tasks available</p>
          <div className='mt-4'>
            <button className='bg-blue-500 text-white p-2 rounded-lg' onClick={() => createTaskMutation.mutate({ title: 'Task 1', description: 'Task 1 description', status: 'To Do' })}>
              Create Task
            </button>
          </div>
        </>
      )}
    </div>
    
</>
  );
};

export default TaskManagement;
