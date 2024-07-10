"use client";
import Modal from "@/components/ui/Modal";
import React, { useEffect, useState,Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Welcome from "@/components/ui/Welcome";
import { useUser } from"@/lib/context/UserContext";
import Loader from "@/components/ui/Loader";

const UserDashboard = ({ userInfo }) => {
  const { username, email, projects, teams, roles, plan } = userInfo;

  const router = useRouter();

  const handleSub = () => {
    router.push("/my-subscriptions");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* User Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <div className="text-gray-700">
          <p className="mb-2">
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
        </div>
      </div>

      {/* Subscription Plan */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Subscription Plan</h2>
        <div className="text-gray-700">
          <p className="mb-4">
            <strong>Current Plan:</strong> {plan}
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            onClick={handleSub}
          >
            Manage Subscription
          </button>
        </div>
      </div>

      {/* Projects Overview */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        {projects.map((project) => (
          <div
            key={project._id}
            className="mb-4 p-4 border rounded-lg bg-gray-50"
          >
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
            <div className="text-gray-700">
              <p className="mb-1">
                <strong>Status:</strong> {project.status}
              </p>
              <p className="mb-1">
                <strong>Start Date:</strong>{" "}
                {new Date(project.startDate).toLocaleDateString()}
              </p>
              <p className="mb-1">
                <strong>End Date:</strong>{" "}
                {new Date(project.endDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Members:</strong> {project.members.length}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Teams */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Teams</h2>
        {teams.map((team) => (
          <div key={team._id} className="mb-4 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
            <div className="text-gray-700">
              <p>
                <strong>Members:</strong> {team.members.length}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Roles and Permissions */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Roles and Permissions</h2>
        {roles.map((role) => (
          <div key={role._id} className="mb-4 p-4 border rounded-lg bg-gray-50">
            <div className="text-gray-700">
              <p className="mb-1">
                <strong>Organization:</strong> {role.organizationId.name}
              </p>
              <p>
                <strong>Role:</strong> {role.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function Page() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const welcome = searchParams.get("welcome");
  const [step, setStep] = useState(1);
  const { userinfo, loading } = useUser();


  useEffect(() => {
    if (Boolean(welcome) === true) {
      setIsModalOpen(true);
    }
  }, [welcome]);

  const closeModal = () => {
    setIsModalOpen(false);
    router.replace("/dashboard", undefined, { shallow: true });
  };

  // if loading

  if (loading) {
    return (<Loader/>);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Welcome step={step} setStep={setStep} closeModal={closeModal} />
      </Modal>
      <div className="w-full max-w-4xl">
        {userinfo && !isModalOpen && <UserDashboard userInfo={userinfo} />}
      </div>
    </div>
  );
}

function Wrapper(){
  return (
    <Suspense fallback={<Loader/>}>
    <Page />
  </Suspense>
  )
}

export default Wrapper;
