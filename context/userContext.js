// UserContext.js
"use client"
import { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios'
import { useRouter } from 'next/navigation';

const UserContext = createContext();


const initialState = {
  userinfo: null,
  organization: null
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        userinfo: action.payload,
      };
    case 'SET_ORG_INFO':
      return {
        ...state,
        organization: action.payload,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const router = useRouter();

  const setUserinfo = (userinfo) => {
    dispatch({ type: 'SET_USER_INFO', payload: userinfo });
  };

  const setOrganizationInfo = (orgInfo) => {
    dispatch({ type: 'SET_ORG_INFO', payload: orgInfo });
  };

  // handle userInfo and organization Info on reload


  useEffect(()=>{
    const fetchUserInfo = async()=>{
      const token = localStorage.getItem('token');
      if(!token){
        return;
      }
      const res = await axios.request("http://localhost:5000/auth/user",{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
    });
    if(res.data){
      setUserinfo(res.data.user);
    }
  }
  fetchUserInfo();

},[router]);

useEffect(()=>{
  const fetchUserInfo = async()=>{
    const token = localStorage.getItem('token');
    if(!token){
      return;
    }
    const res = await axios.request("http://localhost:5000/auth/user",{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
  });
  if(res.data){
    setUserinfo(res.data.user);
  }
}
fetchUserInfo();

},[]);

// handling organizationInfo on reload using local storage stored orginfo

useEffect(()=>{
  const fetchOrgInfo = async()=>{
  const orgInfo = await JSON.parse(localStorage.getItem('organization'));
  if(orgInfo){
    setOrganizationInfo(orgInfo);
  }
}
fetchOrgInfo();
}
,[router])


  console.log({...state});

  return (
    <UserContext.Provider value={{...state, setUserinfo, setOrganizationInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
