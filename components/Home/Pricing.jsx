import Link from 'next/link';
import React from 'react';

const plans = [
  {
    id: 1,
    name: 'Free',
    price: 'price_1PZykeJV7lh6Iq4gpXfhtpUs',
    cost: 0,
    features: [
      'Number of Organizations: 2',
      'Number of Teams: 5',
      'Max members per team: 10',
      'Projects: Unlimited',
      'Kanban Board',
      'Collaborative Whiteboard',
      'Video Meetings, Team, and Project Chats',
      'Forms Builder',
    ],
  },
  {
    id: 2,
    name: 'Basic',
    cost: 999,
    price: 'price_1PZylwJV7lh6Iq4grzLOjkPd',
    features: [
      'Number of Organizations: 10',
      'Number of Teams: 20',
      'Max members per team: 50',
      'Projects: Unlimited',
      'Kanban Board',
      'Collaborative Whiteboard',
      'Video Meetings, Team, and Project Chats',
      'Forms Builder',
    ],
  },
  {
    id: 3,
    name: 'Business',
    cost: 1999,
    price: 'price_1PZymUJV7lh6Iq4gHt3N9rNj',
    features: [
      'Number of Organizations: Unlimited',
      'Number of Teams: Unlimited',
      'Max members per team: Unlimited',
      'Projects: Unlimited',
      'Kanban Board',
      'Collaborative Whiteboard',
      'Video Meetings, Team, and Project Chats',
      'Forms Builder',
    ],
  },
];

const PricingTable = () => {
  return (
    <div className="container mx-auto p-6" id="pricing">
      <h1 className="text-3xl font-bold text-center mb-8">Our Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="border p-4 rounded-lg shadow-2xl border-green-500 shadow-black ">
            <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
            <p className="text-xl font-semibold mb-4">${plan.cost / 100} / month</p>
            <ul className="mb-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="mb-2">
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/auth">
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg ">
              Choose {plan.name}
            </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;
