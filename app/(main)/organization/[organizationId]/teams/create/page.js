// pages/create-team.js
"use client"
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from"@/lib/context/UserContext";
import { useParams, useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';



const CreateTeam = () => {
  const {organizationId} = useParams();
  const fetchOrgMembers = async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/organization/${organizationId}/members`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  };


  console.log(organizationId);
  const [teamName, setTeamName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { data: members = [], isLoading, isError, error } = useQuery({
    queryKey: ['orgMembers'],
    queryFn: fetchOrgMembers,
  });
  const { userinfo } = useUser();
  const router = useRouter();

  

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
      organizationId:organizationId
    };
    
    const token = localStorage.getItem('token')

    if(userinfo.plan == 'Free'){
      if(selectedMembers.length > 10){
        toast.error("You have reached the maximum number of members allowed for the free plan")
        return
      }
    }

    if(userinfo.plan == 'Basic'){
      if(selectedMembers.length > 50){
        toast.error("You have reached the maximum number of members allowed for the Basic plan")
        return
      }
    }

    if(userinfo.teams.length>5 && userinfo.plan=='Free'){
      toast.error("You have reached the maximum number of teams allowed for the current plan")
      return
    }

    console.log(userinfo.teams);
    if(userinfo.teams.length>20 && userinfo.plan=='Basic'){
      toast.error("You have reached the maximum number of teams allowed for the current plan")
      return
    }

    toast.info("Team is being created please wait")



    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/team/${organizationId}/create`,data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    

    if(res.status){
        toast.success(res.data.message)
        router.push(`/organization/${organizationId}/teams/all`);
    }
    else{
      toast.error(res.data.message)
    }
    console.log('Team Created:', res);
  };

  if (isLoading) {
    return <Loader/>;
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
                {members.response.map((member) => (
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
