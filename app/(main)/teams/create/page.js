// pages/create-team.js
"use client"
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
const fetchOrgMembers = async () => {
  const organizationId = "6673fdc1829766e65a19f591";
  const response = await axios.get(`http://localhost:5000/organization/${organizationId}/members`);
  return response.data;
};

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { data: members = [], isLoading, isError, error } = useQuery({
    queryKey: 'orgMembers',
    queryFn: fetchOrgMembers,
  });

  const handleMemberSelection = (memberId) => {
    setSelectedMembers((prevSelected) => {
      if (prevSelected.includes(memberId)) {
        return prevSelected.filter((id) => id !== memberId);
      } else {
        return [...prevSelected, memberId];
      }
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      name: teamName,
      memberIds: selectedMembers,
      organizationId:"6673fdc1829766e65a19f591"
    };
    
    const res = await axios.post("http://localhost:5000/team/create",data);

    if(res.status){
        toast.success("Team successfully created")
    }
    console.log('Team Created:', res);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen flex mt-1 bg-gray-100">
      <div className=" w-[100%] p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Create a New Team</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="teamName" className="block text-gray-700 font-medium mb-2">
              Team Name
            </label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="px-4 py-2">Select</th>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b border-gray-200">
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        id={`member-${member._id}`}
                        checked={selectedMembers.includes(member._id)}
                        onChange={() => handleMemberSelection(member._id)}
                        className="mr-2"
                      />
                    </td>
                    <td className="px-4 py-2">{member.username}</td>
                    <td className="px-4 py-2">{member.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;
