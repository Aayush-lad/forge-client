"use client";

import Logo from './Logo';
import { useState } from 'react';
import AccordionWrapper from './AccordionWrapper';
import Link from 'next/link';
import AccordionItem from './AccordionItem';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';


const Sidebar = ({openSide,setOpen}) => {
  const [index, setIndex] = useState(null);
  const {organizationId} = useParams();
  const router = useRouter();


  // fetch all organization of users

  const fetchAllOrgs = async()=>{
    const token = localStorage.getItem('token');

    if(!token){
      toast.error("Please login to continue. Your session has expired");
      router.push('/auth');
      
    }
    const res = await axios.get('http://localhost:5000/organization/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.organizations;
  };

  const {data, error, isLoading} = useQuery({
    queryKey: ['organizationlist'],
    queryFn: fetchAllOrgs,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("All organization",data);



  if(isLoading){
    return <div>Loading...</div>
  }

  



  const orgId = organizationId;


  const navLinks = [
    {
      main: "Organisation",
      id: 1,
      url:"https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/FFFFFF/external-team-user-tanah-basah-basic-outline-tanah-basah.png",
      subcategories: [
        ...data.map(org => ({
          name: org.name,
          href: `/organization/${org._id}`,
          url: "https://img.icons8.com/?size=100&id=w3f4X2RBkgO2&format=png&color=40C057"
        })),
      
        { name: "Create Organisation", href: `/organization/create`, url:"https://img.icons8.com/android/24/FFFFFF/plus.png" },
       
      ],
    },
    {
      main: "Projects & Task management",
      id: 2,
      url:"https://img.icons8.com/?size=100&id=25391&format=png&color=FFFFFF",
      subcategories: [
        { name: "All Project", href: `/organization/${orgId}/project/all` ,url:"https://img.icons8.com/external-sbts2018-outline-sbts2018/58/FFFFFF/external-all-basic-ui-elements-2.3-sbts2018-outline-sbts2018.png"},
        { name: "Create Project", href: `/organization/${orgId}/project/create`,url:"https://img.icons8.com/external-sbts2018-outline-sbts2018/58/FFFFFF/external-add-basic-ui-elements-2.3-sbts2018-outline-sbts2018.png" },
        { name: "Kanban Board", href: `/organization/${orgId}/project/kanban`,url:"https://img.icons8.com/?size=100&id=RmLuhX9564tx&format=png&color=FFFFFF" },
        { name: "Gantt Chart", href: `/organization/${orgId}/project/ganttchart`,url:"https://img.icons8.com/?size=100&id=Q7kCK9C7TNdk&format=png&color=FFFFFF"},
        { name: "Calendar", href: `/organization/${orgId}/project/calendar`,url:"https://img.icons8.com/?size=100&id=Q7kCK9C7TNdk&format=png&color=FFFFFF" }, 
      ],
    },
    {
      main: "Chat and Collaboration",
      id: 3,
      url:"https://img.icons8.com/?size=100&id=1609&format=png&color=FFFFFF",
      subcategories: [
        { name: "Chat", href: `/organization/${orgId}/chat` ,url:"https://img.icons8.com/?size=100&id=67444&format=png&color=FFFFFF"},
        { name: "Schedules", href: `/organization/${orgId}/schedules`,url:"https://img.icons8.com/?size=100&id=7724&format=png&color=FFFFFF" },
        { name: "Whiteboard", href: `/dashboard/${orgId}` ,url:"https://img.icons8.com/?size=100&id=Oyhn1OzMgr68&format=png&color=FFFFFF"},
        { name: "Video Conference", href: `/dashboard/${orgId}`,url:"https://img.icons8.com/?size=100&id=22994&format=png&color=FFFFFF" },
      ],
    },
    {
      main: "Automation Builder",
      id: 4,
      url:"https://img.icons8.com/?size=100&id=jVfRazGdRIbf&format=png&color=FFFFFF",
      subcategories: [
        { name: "Chat", href: `/dashboard/${orgId}` ,url:"https://img.icons8.com/?size=100&id=67444&format=png&color=FFFFFF"},
        { name: "Schedules", href: `/dashboard/${orgId}`,url:"https://img.icons8.com/?size=100&id=7724&format=png&color=FFFFFF" },
        { name: "Video Conference", href: `/dashboard/${orgId}`,url:"https://img.icons8.com/?size=100&id=22994&format=png&color=FFFFFF" },
      ],
   
    },
    
    {

        main: "Form Builder",
        id: 5,
        url:"https://img.icons8.com/?size=100&id=jVfRazGdRIbf&format=png&color=FFFFFF",
        subcategories: [
            { name: "Chat", href: `/dashboard/${orgId}` ,url:"https://img.icons8.com/?size=100&id=67444&format=png&color=FFFFFF"},
            { name: "Schedules", href: `/dashboard/${orgId}`,url:"https://img.icons8.com/?size=100&id=7724&format=png&color=FFFFFF" },
            { name: "Video Conference", href: `/dashboard/${orgId}`,url:"https://img.icons8.com/?size=100&id=22994&format=png&color=FFFFFF" },
          ],


    },
    
    {
        main: "Account Settings",
        id: 6,
        url:"https://img.icons8.com/?size=100&id=jVfRazGdRIbf&format=png&color=FFFFFF",

        subcategories: [
            { name: "Chat", href: `/dashboard/${orgId}` ,url:"https://img.icons8.com/?size=100&id=67444&format=png&color=FFFFFF"},
            { name: "Schedules", href: `/dashboard/${orgId}`,url:"https://img.icons8.com/?size=100&id=7724&format=png&color=FFFFFF" },
            { name: "Video Conference", href: `/dashboard/${orgId}`,url:"https://img.icons8.com/?size=100&id=22994&format=png&color=FFFFFF" },
          ]
          

    }
  ];

  return (

    <>
    { openSide &&(        
    <div className=" flex flex-col max-w-[300px] shadow-2xl min-h-screen  bg-[#181F38] z-[10000] overflow-y-auto">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center p-5 gap-8">
        <div className='flex  items-center gap-[100px]'>
        <Logo />
        <Image src={"https://img.icons8.com/?size=100&id=QhBXKbrCJDl6&format=png&color=FFFFFF"} width={20} height={12} alt="L" onClick={()=>setOpen(false)}/>
        </div>
        {/* Accordion menu */}

        <div>
          <div className="flex flex-col  min-w-[300px] cursor-pointer">
            {navLinks.map((item) => (
              <div
                key={item.id}
                className="flex flex-col  gap-1 p-2 text-white text-sm hover:bg-[#323F5E] "
                onClick={() => setIndex(item.id === index ? null : item.id)}
              >
                <div className='flex gap-2'>
                 
                {
                 item.url &&(
                    <>
                <Image width={20}height={12} src={`${item.url}`} alt="L"/>
                <span className="text-white text-sm p-1">{item.main}</span>
               
                </>
            ) }
             </div>
                
                

                <AccordionWrapper open={item.id === index}>
                  {item.subcategories.map((sub) => (
                    <AccordionItem key={sub.name} href={sub.href}>
                    <div className='flex gap-2'>
                    
                      <Image width={20} height={12} src={`${sub.url}`} alt="L"/>
                      {sub.name}
                      </div>
                    </AccordionItem>
                  ))}
                </AccordionWrapper>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    )}
    </>
    
    
  );
};

export default Sidebar;
