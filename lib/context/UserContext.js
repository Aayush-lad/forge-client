// UserContext.js
"use client";
import { createContext, useContext, useEffect, useReducer,useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const UserContext = createContext();

const initialState = {
  userinfo: null,
  organization: null,
  loading: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        userinfo: action.payload,
        loading: false,
      };
    case 'SET_ORG_INFO':
      return {
        ...state,
        organization: action.payload,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'RESET_LOADING':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const router = useRouter();
  const [invalidate,toggleInvalidate] = useState(false)

  const setUserinfo = (userinfo) => {
    dispatch({ type: 'SET_USER_INFO', payload: userinfo });
  };

  const setOrganizationInfo = (orgInfo) => {
    dispatch({ type: 'SET_ORG_INFO', payload: orgInfo });
  };

  const fetchUserInfo = async () => {
    dispatch({ type: 'SET_LOADING' });
    let token = localStorage.getItem('token');
    if (!token) {
      dispatch({ type: 'RESET_LOADING' });
      return;
    }
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(res.data);
      if (res.data) {
        setUserinfo(res.data.user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: 'RESET_LOADING' });
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchOrgInfo();
  },[router,invalidate]);

  const fetchOrgInfo = () => {
    const orgInfo = JSON.parse(localStorage.getItem('organization'));
    if (orgInfo) {
      setOrganizationInfo(orgInfo);
    }
  };



  return (
    <UserContext.Provider value={{ ...state, setUserinfo, setOrganizationInfo ,toggleInvalidate}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
