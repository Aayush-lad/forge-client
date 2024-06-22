import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Select from 'react-select';

const Header = ({ openSide, setOpen, children }) => {
  const [organization, setOrganization] = useState(null);
  const [options, setOptions] = useState([]);
  const router = useRouter();

  // Fetch user organizations
  const getUserOrganizations = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/organization/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.organizations; // Assuming organizations are directly under 'organizations' key
    } catch (error) {
      console.error('Error fetching organizations:', error);
      return [];
    }
  };

  // useQuery hook to fetch organizations
  const { data, isLoading, error, refetch } = useQuery({queryKe:'organizationlist',queryFn: getUserOrganizations});

  useEffect(() => {
    if (data) {
      const orgOptions = data.map((org) => ({
        value: org._id,
        label: org.name,
      }));
      setOptions(orgOptions);
    }
  }, [data]);

  // Handle change in Select component
  const handleChange = (selectedOption) => {
    setOrganization(selectedOption);
    router.push(`/organization/${selectedOption.value}`);
  };

  return (
    <div className={`flex shadow-md p-3 ${openSide ? 'justify-end' : 'justify-between'} items-center z-100`}>
      {!openSide && (
        <div className='flex-start'>
          <Image
            src={'https://img.icons8.com/?size=100&id=3096&format=png&color=000000'}
            height={20}
            width={20}
            alt='menu'
            onClick={() => setOpen(true)}
          />
        </div>
      )}

      <div className='flex'>
        <div>
          <h1 className='text-md mt-2 font-bold '>{children}</h1>
        </div>
        {console.log(data)}
        {options.length > 0 && (
          <div className='px-2'>
            <Select
              value={organization}
              onChange={handleChange}
              options={options}
              placeholder='Select organization'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
