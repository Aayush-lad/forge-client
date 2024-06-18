"use client";

import AuthForm from "@/components/ui/AuthForm";
import { ToastContainer } from "react-toastify";


const page = () => {
  return (
    <div className="flex items-center justify-around h-screen w-screen bg-[#EDF1F6]">
    <AuthForm/>
    </div>

    
  )
}

export default page