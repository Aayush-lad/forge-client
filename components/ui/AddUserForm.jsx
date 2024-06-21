import React from 'react'

import Select from "react-select";
import axios from "axios"
import { toast } from 'react-toastify';



const AddUserForm = ({onAdd}) => {

    const orgId = "6673fdc1829766e65a19f591";
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const email = document.getElementById("email").value;
        const role = document.getElementById("role").value;
        const data = {
          email,
          role,
          organizationId: orgId,
        };

        await onAdd(data)
    
      };

    


    return (
        <>
        <div className="flex">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
              Add a new member
            </h1>
           
           

            {/* invite people to organisation */}
            <form className="flex flex-col space-y-4" >
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
                  onClick={handleSubmit}
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
    </div>  
    </>
  )
}

export default AddUserForm