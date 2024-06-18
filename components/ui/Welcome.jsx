"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";

const Welcome = ({ step, setStep }) => {
  const [orgId, setOrgId] = useState(null);
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/organization/66719d64dffe19377daa227e/members"
        );
        console.log(response);
        const memberOptions = response.data.map((member) => ({
          value: member._id,
          label: member.username,
        }));
        setMembers(memberOptions);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleStep1 = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    setStep(2);

    // creating organisation
    const organisationName = document.getElementById("organisationName").value;
    const data = {
      name: organisationName,
    };

    const res = await axios.post(
      "http://localhost:5000/organization/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data?.organization?._id) {
      setOrgId(res.data.organization._id);
    }
    toast.success(res.data.message);
  };

  const handleStep2 = async (e) => {
    e.preventDefault();

    // adding member to organisation

    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;

    const token = localStorage.getItem("token");

    const data = {
      email,
      role,
      organizationId: orgId,
    };

    console.log(data);

    const res = await axios.post(
      "http://localhost:5000/organization/add-member",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);

    toast.success(res.data.message);
  };

  const handleCreateTeam = async (e) => {

    try {
      const response = await axios.post("/api/teams", {
        name,
        organizationId,
        memberIds: selectedMembers.map((member) => member.value),
      });
      console.log("Team created:", response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  return (
    <>
      {step === 1 && (
        <div className="flex">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
              Welcome to your dashboard
            </h1>
            <p className="mb-4">
              Just a few steps to go!!<br></br>
              You can create an organisation to get started.
            </p>
            <form className="flex flex-col space-y-4">
              <label
                htmlFor="organisationName"
                className="text-sm font-semibold"
              >
                Organisation Name
              </label>
              <input
                type="text"
                id="organisationName"
                className="p-2 border border-gray-200 rounded-md"
              />
              <button
                className="bg-green-500 text-white rounded-md p-2"
                onClick={(e) => handleStep1(e)}
              >
                Create Organisation
              </button>
            </form>
          </div>
          <div>
            <Image
              src="/organisation_banner.gif"
              alt="Banner"
              height={300}
              width={400}
            />
          </div>
        </div>
      )}

      {step == 2 && (
        <div className="flex">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
              Great!! Now lets add some members
            </h1>
            <p className="mb-4">
              You can always add new members using your organisation dashboard
            </p>

            {/* invite people to organisation */}
            <form className="flex flex-col space-y-4">
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="p-2 border border-gray-200 rounded-md"
              />

              <label htmlFor="role" className="text-sm font-semibold">
                Role
              </label>
              <select
                id="role"
                className="p-2 border border-gray-200 rounded-md"
              >
                <option value="Admin" className="p-1S">
                  Admin
                </option>
                <option value="ProjectManager">Project Manager</option>
                <option value="Member">Member</option>
              </select>
              <div className="flex gap-2">
                <button
                  className="bg-green-500 text-white rounded-md p-2"
                  onClick={(e) => handleStep2(e)}
                >
                  Add Member
                </button>
                <button
                  className="bg-green-500 text-white rounded-md text-center p-2"
                  onClick={() => setStep(3)}
                >
                  Add Later
                </button>
              </div>
            </form>
          </div>
          <div>
            <Image
              src="/organisation_banner.gif"
              alt="Banner"
              height={300}
              width={400}
            />
          </div>
        </div>
      )}

      {step == 3 && (
        <div className="flex">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Build your Team </h1>
            <p className="mb-4">
              You will be able to add and remove team members from your
              organization Create team and add members
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <div className="flex flex-col gap-1">
                <label>Team Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="p-1 ml-1 border border-gray-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Select Team Members</label>
                {console.log(members)}
                <Select
                  isMulti
                  options={members}
                  value={selectedMembers}
                  onChange={setSelectedMembers}
                  className="text-black"
                />
              </div>
              <button
                className="mt-[10px] bg-green-500 text-white rounded-md p-2"
                onClick={() => handleCreateTeam()}
              >
                Create Team
              </button>
            </form>
          </div>
          <div>
            <Image
              src="/organisation_banner.gif"
              alt="Banner"
              height={300}
              width={400}
            />
          </div>
        </div>
      )}

      {step == 4 && (
        <div className="flex">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
              Welcome to your dashboard
            </h1>
            <p className="mb-4">
              Just a few steps to go!!<br></br>
              You can create an organisation to get started.
            </p>
            <form className="flex flex-col space-y-4">
              <label
                htmlFor="organisationName"
                className="text-sm font-semibold"
              >
                Organisation Name
              </label>
              <input
                type="text"
                id="organisationName"
                className="p-2 border border-gray-200 rounded-md"
              />
              <button className="bg-green-500 text-white rounded-md p-2">
                Create Organisation
              </button>
            </form>
          </div>
          <div>
            <Image
              src="/organisation_banner.gif"
              alt="Banner"
              height={300}
              width={400}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Welcome;
