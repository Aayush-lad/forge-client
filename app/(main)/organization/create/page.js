"use client"
import { useState } from 'react';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUser } from"@/lib/context/UserContext";

const CreateOrganization = () => {
  const [organization, setOrganization] = useState('');
  const [csvData, setCsvData] = useState([]);
  const {userinfo} = useUser();
  
  const router = useRouter();
  const queryClient = useQueryClient();

  const createOrganization = async (data) => {

    const token = localStorage.getItem('token');
    
    try {

      if(userinfo?.roles?.length >2 && userinfo.plan == 'Free'){
        toast.error("You have reached the maximum number of organizations allowed for the free plan")
        return {message:"sub overlimit", status:true}

      }
      else if(userinfo?.roles?.length >10 && userinfo.plan == 'Basic'){
        toast.error("You have reached the maximum number of organizations allowed for the Basic plan")
        return {message:"sub overlimit", status:true}
      }
      

      
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/organization/create-org`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );



      return res.data; 
    } catch (error) {
      console.error("Error creating organization:", error);
      throw error; // Re-throw the error for further handling
    }
  };
  

  const createMutation = useMutation({
  
    mutationFn: createOrganization,
    onSuccess: (data) => {
   
      if (data && data?.organization?._id) {
        queryClient.invalidateQueries(['organizationlist']);
        toast.success("Organization successfully created")
        router.push(`/organization/${data.organization._id}`);
      } else {
        if(!data.status){
        toast.error("Please check the data it might be invalid")

        }
      }
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
    }
  });





  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    Papa.parse(file, {
      header: true,
      complete: (results) => {

  
        toast.success("file uploaded successfully")
        setCsvData(results.data);
        
      },
      error: (error) => {
        console.error('Error parsing CSV: ', error);
      }
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.csv'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate({ organization, members: csvData });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Create Organization</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Organization Name</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <p className="text-gray-700 mb-2">
                Please upload a CSV file with the following format:
              </p>
              <pre className="bg-gray-100 p-2 rounded border border-gray-300 mb-2">
                email,role
                <br />
                example1@example.com,admin
                <br />
                example2@example.com,user
              </pre>
              <a
                href="/template.csv"
                download
                className="text-blue-500 hover:underline"
              >
                Download CSV Template
              </a>
            </div>
            <div {...getRootProps()} className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer">
              <input {...getInputProps()} />
              <p>Drag and drop a CSV file here, or click to select a file</p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Create Organization
            </button>
          </form>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Role Descriptions</h3>
          <ul className="space-y-3 ">

          <li><span className='bg-yellow-500 text-white p-2 rounded-lg mb-2'>Member</span> Regular user with access to project tasks and resources.</li>
            <li><span className='bg-red-500 text-white p-2 rounded-lg mb-2'>Project Manager</span>: Responsible for managing project workflows and tasks.</li>
            <li><span className='bg-green-500 text-white p-2 rounded-lg mb-2'>Admin</span>: Full administrative permissions within the organization.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateOrganization;
