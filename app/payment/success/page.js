"use client"
import axios from 'axios';
// pages/payment-successful.js
import { useRouter ,useSearchParams} from 'next/navigation';
import { useEffect,Suspense } from 'react';
import Loader from '@/components/ui/Loader';

const PaymentSuccessful = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const plan = searchParams.get('plan');
  const sessionid = searchParams.get('session_id');

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  useEffect(()=>{

    const changePlan= async(plan)=>{

        const res = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/change-plan`,JSON.stringify({plan}),{
            headers:{
                'Authorization':`bearer ${localStorage.getItem('token')}`,
                'Content-Type':'application/json'
            }
        })

     
    }

    if(plan && sessionid){
        changePlan(plan);
    }

  },[plan,sessionid])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg mb-8">Thank you for your purchase. Your payment has been successfully processed.</p>
      <button
        onClick={handleBackToDashboard}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

function Wrapper(){
  return <Suspense fallback={<Loader/>}>
    <PaymentSuccessful/>
  </Suspense>
}

export default Wrapper;
