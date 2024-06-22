"use client";
import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination'; // Assuming you have a Pagination component

const fetchOrganizations = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get('http://localhost:5000/organization/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const deleteOrganization = async (id) => {
  const token = localStorage.getItem('token');
  await axios.delete(`http://localhost:5000/organization/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AllOrganizationsPage = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ['organizationlist'], 
    queryFn: fetchOrganizations,

  });

  const [search, setSearch] = useState('');
  const [filteredOrgs, setFilteredOrgs] = useState([]);
  const router = useRouter();
  const [refetch,setRefetch] = useState(false);

  useEffect(() => {
    if (data) {

      if(search)
      setFilteredOrgs(data?.data?.organizations?.filter(org => org.name.toLowerCase().includes(search.toLowerCase())));
      else
      setFilteredOrgs(data?.data?.organizations);
      
    }

  
  }, [data, search,error,isLoading]);

  const mutation = useMutation({
    mutationFn: deleteOrganization,
    onSuccess: (d) => {
      console.log("Mutation Success Data:", d);
      queryClient.invalidateQueries(['organizationlist']);  
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
    }
  });

  useEffect(() => {
    if (data) {
      setFilteredOrgs(data?.data?.organizations?.filter(org => org.name.toLowerCase().includes(search.toLowerCase())));
    }
  }, [data, search]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading organizations</div>;

  const handleViewDetails = (id) => {
    router.push(`/organization/${id}`);
  };

  const handleEdit = (id) => {
    router.push(`/organization/edit/${id}`);
  };

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 z-0">All Organizations</h1>
      <Input
        placeholder="Search organizations"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {console.log(data)}
        {console.log(filteredOrgs)}



        {filteredOrgs?.map(org => (
          <div key={org._id} className="p-4  z-0 border rounded overflow-hidden shadow-lg transform transition-transform hover:-translate-y-2 hover:scale-105">
            <h2 className="text-xl font-bold">{org.name}</h2>
            <p className="text-sm">Created on: {new Date(org.createdAt).toLocaleDateString()}</p>
            <p className="text-sm">Members: {org.membersCount}</p>
            <div className="mt-2 flex space-x-2">
              <Button onClick={() => handleViewDetails(org._id)}>View Details</Button>
              <Button onClick={() => handleEdit(org._id)}>Edit</Button>
              <Button onClick={() => handleDelete(org._id)} className="bg-red-600">Delete</Button>
            </div>
          </div>
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default AllOrganizationsPage;
