import React from 'react'

import Select from "react-select";
import axios from "axios"
import { toast } from 'react-toastify';



const AddUserForm = ({onAdd,type="org"}) => {

    const orgId = "6673fdc1829766e65a19f591";
    const teamId = "66778acf269de4bce0c6b5b1"

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const email = document.getElementById("email").value;
        const role = document.getElementById("role").value;
        let data ={}
        if(!teamId ){
           data = {
          email,
          role,
          organizationId: orgId,
        };
      }
        else{
          data = {
            email,
          }
        }
        await onAdd(data)
      };

    


    return (
        <>

        <div className="flex">
          <div className="p-4">
            <div className='mb-4'>
            <h1 className="text-2xl font-bold">
              Add a new member
            </h1>

            {type == "team" &&
            <p className="text-gray-400 text-sm ">Member you add must be part of the organization</p> 
            }    
            </div>

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

            

              {type!="team"&&(

                <>

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
              </>
              )}
              
              
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