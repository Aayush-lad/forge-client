// src/TaskCard.js
import React from 'react';

const TaskCard = ({ task }) => {
  const { title, description, priority, status, createdAt, updatedAt } = task;

  const priorityColor = {
    'Low': 'bg-green-100 text-green-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'High': 'bg-red-100 text-red-800',
  };

  const statusColor = {
    'To Do': 'bg-gray-100 text-gray-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Done': 'bg-green-100 text-green-800',
  };

  return (
    <div className="w-[300px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4 transform transition-transform hover:scale-105 hover:shadow-2xl"
    data-testid={`task-${task._id}`}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 text-base mb-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className={`px-2 py-1 rounded ${priorityColor[priority]}`}>{priority}</span>
          <span className={`px-2 py-1 rounded ${statusColor[status]}`}>{status}</span>
        </div>
        <div className="text-gray-600 text-sm mt-2">
          <p>Created: {new Date(createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
