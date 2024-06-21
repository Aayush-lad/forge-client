import React,{useState} from 'react'

const roles = [
    {
      id: 'Admin',
      name: 'Admin',
      description: 'Can manage users, roles, organizations, and teams.',
    },
    {
      id: 'ProjectManager',
      name: 'Project Manager',
      description: 'Can manage projects and create teams.',
    },
    {
      id: 'Member',
      name: 'Member',
      description: ' write and read access to projects.',
    },
  ];

  
const UpdateRole = ({email,updateMutation}) => {
    console.log(email);

    const [selectedRole, setSelectedRole] = useState(roles[0].id);

    const handleUpdateRole = async (e) => {
        e.preventDefault();
        
        const data = {
            email,
            role: selectedRole,
        }

        updateMutation(data);

      }
  

    const handleChange = (event) => {
      setSelectedRole(event.target.value);
    };
    
  return (
    <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold mb-4">Update Role</h1>


        <p className="text-sm text-gray-500">Permissions : {roles.find((role) => role.id === selectedRole).description}</p>
   
    
        <form className="flex flex-col space-y-4">
            <label htmlFor="email" className="text-sm font-semibold " >Email</label>
            <input type="email" id="email" className="p-2 border border-gray-200 rounded-md" value={email} disabled placeholder={email} />

            <label htmlFor="role-select">Select Role: </label>
      <select id="role-select" value={selectedRole} onChange={handleChange} className='p-3 border border-gray-200 rounded-md'>
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md" onClick={handleUpdateRole}>Update Role</button>
        </form>

    </div>
  )
}

export default UpdateRole