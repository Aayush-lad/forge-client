"use client"
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios'; // Import axios for API calls
import { useParams } from 'next/navigation';
import { useQueryClient,useMutation } from '@tanstack/react-query';
import TaskCard from './TaskCard';

// Define column statuses
const statuses = ['To Do', 'In Progress', 'Completed'];

// Task component
const Task = ({ task, moveTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 bg-white shadow-md rounded-md ${isDragging ? 'opacity-50' : ''}`}
    >
      <TaskCard task={task}/>
    </div>
  );
};

// KanbanBoard component
const KanbanBoard = ({ tasks }) => {
  const [boardTasks, setBoardTasks] = useState(tasks);
  const {projectId} = useParams();


  const queryClient = useQueryClient();


  const moveTask = async (id, status) => {
    const updatedTasks = boardTasks.map((task) =>
      task._id === id ? { ...task, status } : task
    );
    setBoardTasks(updatedTasks);

    try {
      // Make API call to update task status
      const response = await axios.put(`http://localhost:5000/project/${projectId}/update-task-status/${id}`, {
        status,
      });

      queryClient.invalidateQueries(['project', '6678ef15a8526ce6879662ef']);

      
      
      console.log('Task status updated in backend:', response.data);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const findTask = (id) => {
    return boardTasks.find((task) => task._id === id);
  };

  const TaskColumn = ({ status }) => {
    const [{ isOver }, drop] = useDrop({
      accept: 'TASK',
      drop: (item) => moveTask(item.id, status),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    const filteredTasks = boardTasks.filter((task) => task.status === status);

    return (
      <div
        ref={drop}
        className={`w-1/3 p-4 bg-gray-100 rounded-md ${
          isOver ? 'border-2 border-blue-500' : ''
        }`}
      >
        <h3 className="mb-4 font-semibold text-lg capitalize">{status}</h3>
        {filteredTasks.map((task) => (
          <Task key={task._id} task={task} moveTask={moveTask} />
        ))}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-center p-8">
        {statuses.map((status) => (
          <TaskColumn key={status} status={status} />
        ))}
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
