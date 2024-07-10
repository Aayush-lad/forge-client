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
import { useUser } from '@/lib/context/UserContext';
import Loader from './Loader';

import "./scrollbar.css"


const Sidebar = ({ openSide, setOpen }) => {
  const [index, setIndex] = useState(null);
  const { organizationId } = useParams();
  const router = useRouter();
  const { userinfo } = useUser();

  console.log(userinfo);

  // fetch all organization of users
  const fetchAllOrgs = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error("Please login to continue. Your session has expired");
      router.push('/auth');
    }
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/organization/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res);
    return res.data.organizations;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['organizationlist'],
    queryFn: fetchAllOrgs,
  });

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push("/auth");
  }

  const handleChangePlan = () => {
    router.push("/my-subscriptions");
  }

  if (isLoading) return <Loader />
  if (error) return <p>Error: {error.message}</p>;

  console.log("All organization", data);

  const orgId = JSON.parse(localStorage.getItem('currentOrganization'))?._id;

  const navLinks = [
    {
      main: "Organization",
      id: 1,
      url: "https://img.icons8.com/?size=100&id=105326&format=png&color=40C057",
      subcategories: [
        ...data.map(org => ({
          name: org.name,
          href: `/organization/${org._id}`,
          url: "https://img.icons8.com/?size=100&id=w3f4X2RBkgO2&format=png&color=40C057",
          onClick: () => {
            localStorage.setItem('currentOrganization', JSON.stringify(org));
            router.push(`/organization/${org._id}`);
          }
        })),
        { name: "Create Organisation", href: `/organization/create`, url: "https://img.icons8.com/android/24/40C057/plus.png" },
      ],
    },
    {
      main: "Projects & Task management",
      id: 2,
      url: "https://img.icons8.com/?size=100&id=105288&format=png&color=40C057",
      subcategories: [
        { name: "All Project", href: `/organization/${orgId}/project/all`, url: "https://img.icons8.com/external-sbts2018-outline-sbts2018/58/40C057/external-all-basic-ui-elements-2.3-sbts2018-outline-sbts2018.png" },
        { name: "Create Project", href: `/organization/${orgId}/project/all`, url: "https://img.icons8.com/android/24/40C057/plus.png" },
      ],
    },
    {
      main: "Teams ",
      id: 3,
      url: "https://img.icons8.com/?size=100&id=70090&format=png&color=40C057",
      subcategories: [
        { name: "All Teams", href: `/organization/${orgId}/teams/all`, url: "https://img.icons8.com/?size=100&id=oorfgnqNwKIA&format=png&color=40C057" },
        { name: "Create", href: `/organization/${orgId}/teams/create`, url: "https://img.icons8.com/android/24/40C057/plus.png" },
      ],
    },
    {
      main: "Chat and Video Call Meetings",
      id: 4,
      url: "https://img.icons8.com/?size=100&id=124222&format=png&color=40C057",
      subcategories: [
        { name: "Chat", href: `/chat`, url: "https://img.icons8.com/?size=100&id=67444&format=png&color=40C057" },
        { name: "Video Call Meeting", href: `/organization/${orgId}/meeting`, url: "https://img.icons8.com/?size=100&id=22994&format=png&color=40C057" },
      ],
    },
    {
      main: "Form Builder",
      id: 5,
      url: "https://img.icons8.com/?size=100&id=103442&format=png&color=40C057",
      subcategories: [
        { name: "Create", href: `/forms/create`, url: "https://img.icons8.com/?size=100&id=11153&format=png&color=40C057" },
        { name: "My Forms", href: `/forms/all`, url: "https://img.icons8.com/?size=100&id=24516&format=png&color=40C057" }
      ],
    },
    {
      main: "Whiteboard",
      id: 6,
      url: "https://img.icons8.com/?size=100&id=Oyhn1OzMgr68&format=png&color=40C057",
      subcategories: [
        { name: "Open Whiteboard", href: `/whiteboard/${userinfo?._id || userinfo?.id}`, url: "https://img.icons8.com/?size=100&id=GexQgjeZvl1e&format=png&color=40C057" },
      ]
    }
  ];

  return (
    <>
      {openSide && (
        <div className="flex flex-col max-w-[300px] shadow-2xl min-h-screen bg-[#13182e] z-[10000] ">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center p-5 gap-8">
            <div className='flex items-center gap-[100px]'>
              <Logo />
              <Image src={"https://img.icons8.com/?size=100&id=QhBXKbrCJDl6&format=png&color=FFFFFF"} width={20} height={12} alt="L" onClick={() => setOpen(false)} />
            </div>
            {/* Accordion menu */}
            <div className="flex flex-col min-w-[300px] cursor-pointer">
              {navLinks.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-1 p-2 text-white text-sm hover:bg-[#323F5E]"
                  onClick={() => setIndex(item.id === index ? null : item.id)}
                >
                  <div className='flex justify-between'>
                    {item.url && (
                      <>
                        <div className='flex gap-1'>
                          <Image width={25} height={12} src={`${item.url}`} alt="L" />
                          <span className="text-white text-sm p-1">{item.main}</span>
                        </div>
                        <div>
                          <Image width={25} height={12} src={item.id === index ? "https://img.icons8.com/?size=100&id=15825&format=png&color=40C057" : "https://img.icons8.com/ios-glyphs/30/40C057/expand-arrow.png"} alt="L" />
                        </div>
                      </>
                    )}
                  </div>
                  <AccordionWrapper open={item.id === index}>
                    {item.subcategories.map((sub) => (
                      <AccordionItem key={sub.name} href={sub.href} onClick={sub.onClick}>
                        <div className='flex gap-2'>
                          <Image width={20} height={12} src={`${sub.url}`} alt="L" />
                          {sub.name}
                        </div>
                      </AccordionItem>
                    ))}
                  </AccordionWrapper>
                </div>
              ))}
                      <div className='flex justify-center items-center gap-2 p-2 mt-auto flex-col '>
            <div className='flex items-center flex-row gap-2 w-full h-full mx-auto flex-1 mt-[20px] border rounded-md border-white text-white'>
              <p className='mx-3 mt-2'>Current Organization</p>
              <div className='border border-white rounded-md p-3 m-2 text-white mx-2 w-fit items-center justify-center text-md bg-green-500 ml-3'>
                {JSON.parse(localStorage.getItem('currentOrganization')).name ?? "No Organization"}
              </div>
            </div>
          </div>

          <div className='flex  gap-1 p-1  flex-col '>
            <div className='flex flex-col gap-2 w-full h-full mx-auto flex-1 mt-[20px] border rounded-md border-white text-white'>
              <p className='mx-3 mt-2'>Current Plan</p>
              <div className='border border-white rounded-md p-3 m-2 text-white mx-2 w-fit items-center justify-center text-md bg-green-500 ml-3'>
                {userinfo?.plan ?? "Free"} Plan
              </div>
              {/* Change Plan */}
              <div className='flex items-center justify-center gap-2 bg-blue-500 cursor-pointer' onClick={() => handleChangePlan()}>
                <Image src={"https://img.icons8.com/?size=100&id=79633&format=png&color=FFFFFF"} width={20} height={12} alt="L" />
                <p>Change Plan</p>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className='flex items-center justify-center  gap-2 bg-red-500 cursor-pointer text-white w-fit p-3 mt-2 rounded-xl' onClick={() => handleLogout()}>
            <Image src={"https://img.icons8.com/?size=100&id=2445&format=png&color=FFFFFF"} width={20} height={12} alt="L" />
            <p>Logout</p>
            </div>
            </div>
            
          </div>
          {/* Current Organization */}
  
     
        </div>
      )}
    </>
  )
};

export default Sidebar;
