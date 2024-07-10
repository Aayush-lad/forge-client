"use client"
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios"
import { useUser } from '../../../context/UserContext';
const plans = [
  {
    id: 1,
    name: 'Free',
    price: 'price_1PZykeJV7lh6Iq4gpXfhtpUs',
    cost:0,
    features: ['Number of Organization: 2', 'Number of Teams:5','Max member per team:10', 'Projects:Unlimited', 'Kanban Board','Collaborative WhiteBoard','Video Meetings and Team and Project Chats','Forms Builder']
  },
  {
    id: 2,
    name: 'Basic',
    cost:999,
    price: 'price_1PZylwJV7lh6Iq4grzLOjkPd',
    features: ['Number of Organization: 10', 'Number of Team:20', 'Projects:Unlimited', 'Kanban Board','Collaborative WhiteBoard','Video Meetings and Team and Project Chats','Forms Builder'],
  },
  {
    id: 3,
    name: 'Business',
    cost:1999,
    price: 'price_1PZymUJV7lh6Iq4gHt3N9rNj',
    features: ['Number of Organization: Unlimited', 'Number of Teams:Unlimited', 'Projects:Unlimited', 'Collaborative Whiteboard','Kanban Board','Video Meetings and Team and Project Chats', 'Form Builder'],
  },
];

function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const {userinfo,loading} = useUser(); 
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    const stripe =  await loadStripe('pk_test_51PZxHmJV7lh6Iq4gYzW1bsAdXcbECCDNP7rk4JcYGvj05E7gijVOhBDqleKWXzeP24FHkdlOPqfT0z11nwsBJdEp00QNe2m8QZ'); 
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/create-checkout-session`,JSON.stringify(selectedPlan),    {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response);
    const session = response.data;

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.error(result.error.message);
    }


    
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg p-8 shadow-md ">
        <h2 className="text-2xl font-bold mb-6">Choose a Plan</h2>
        <div className=" flex gap-x-1  ">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border-2 p-4 rounded-lg cursor-pointer w-[350px] ${
                selectedPlan.id === plan.id ? 'border-blue-500' : 'border-gray-200'
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p className="text-gray-500">₹ {(plan.cost).toFixed(2)} / month</p>
                </div>
                {selectedPlan.id === plan.id && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <ul className="mt-2 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm10-4a2 2 0 11-4 0 2 2 0 014 0zm2 8a2 2 0 01-2 2H8a2 2 0 01-2-2v-1a4 4 0 014-4h4a4 4 0 014 4v1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
    
          <button
          
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Subscribe to {selectedPlan.name}
          </button>
      </div>
    </div>
  );
}

export default BillingPage;
