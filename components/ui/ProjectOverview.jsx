import React from 'react';


const ProjectOverview = ({data}) => {

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
  const formatDateTime = (dateString) => new Date(dateString).toLocaleString();

  

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{data.name}</h1>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${data.status === 'Not Started' ? 'bg-red-500' : data.status === 'In Progress' ? 'bg-yellow-500' : 'bg-green-500'}`}>
            {data.status}
          </span>
        </div>

        {/* Dates Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Dates</h2>
          <div className="text-gray-600">
            <div className="mb-2"><strong>Start Date:</strong> {formatDate(data.startDate)}</div>
            <div><strong>End Date:</strong> {data.endDate ? formatDate(data.endDate) : 'N/A'}</div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.members.map(member => (
              <div key={member._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{member.username}</h3>
                <p className="text-gray-600">{member.email}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.tasks.length ? data.tasks.map((task, index) => (
              <div key={index} className={`p-4 rounded-lg shadow-md ${task.status === 'Completed' ? 'bg-green-100' : task.status === 'In Progress' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                <h3 className="text-lg font-semibold">{task.name}</h3>
                <p className="text-gray-600">{task.description}</p>
                <span className={`px-2 py-1 rounded-full text-sm font-semibold text-white ${task.status === 'Completed' ? 'bg-green-500' : task.status === 'In Progress' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                  {task.status}
                </span>
              </div>
            )) : <p>No tasks available</p>}
          </div>
        </div>

        {/* Metadata Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Metadata</h2>
          <div className="text-gray-600">
            <div className="mb-2"><strong>Project ID:</strong> {data._id}</div>
            <div className="mb-2"><strong>Created At:</strong> {formatDateTime(data.createdAt)}</div>
            <div><strong>Updated At:</strong> {formatDateTime(data.updatedAt)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
