"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import {
  Form,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Logo from './Logo';
import axios from 'axios';
import { toast } from 'react-toastify';

import {useAuth} from "../../context/AuthContext";
import {useUser} from "../../context/UserContext";


const AuthForm = () => {


  const [isSignUp, setIsSignUp] = useState(true);

  const {login} = useAuth();
  const {setUserInfo} = useUser();




  const form = useForm();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, reset } =form

  const onSubmit = async (data) => {
    if(isSignUp){
     const res = await axios.post("http://localhost:5000/auth/register",data);
      if(res.data.status){
        localStorage.setItem('token',res.data.token);
        login(res.data.token,res.data.user);

        toast.success("Account created Successfully")
        router.push("/dashboard?welcome=true")
      }
      else{
        toast.error(res.data.message);
      }
    }
    else{
      console.log("in signin");
      const res = await  axios.post("http://localhost:5000/auth/login",data);
      console.log(res);
      if(res.data.status){
        localStorage.setItem('token',res.data.token);
        login(res.data.token,res.data.user);
        // setUserInfo(res.data.user);
        toast.success("Authentication successfull");
        router.push("/dashboard");
      }
      else{
        toast.error("Invalid credentials");
      }
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    reset();
  };

  return (

   
    <div className='flex  flex-col gap-2 bg-white shadow-md p-5 w-full max-w-[600px] mx-2'>
       <div className='mx-auto'>
       <Logo />
       </div>
      <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
      <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        {isSignUp && (
          <div className='flex flex-col gap-2'>
            <label htmlFor="username">Name</label>
            <Input id="username" type="text" {...register('username', { required: 'Name is required' })} />
            {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
          </div>
        )}
        <div className='flex flex-col gap-2'>
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" {...register('email',{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} />
          {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="password">Password</label>
          <Input id="password" type="password" {...register('password',{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} />
          {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
        </div>

        <Button type="submit" className="mt-2 ">{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
        </form>
        </Form>
      <Button onClick={toggleForm} >
        {isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
      </Button>
    </div>
    
  );
};

export default AuthForm;
