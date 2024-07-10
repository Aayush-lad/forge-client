// pages/payment-failure.js
"use client"
import { useRouter } from 'next/navigation';

const PaymentFailure = () => {
  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
      <p className="text-lg mb-8">Unfortunately, your payment could not be processed. Please try again.</p>
      <button
        onClick={handleBackToDashboard}
        className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-semibold rounded"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default PaymentFailure;
