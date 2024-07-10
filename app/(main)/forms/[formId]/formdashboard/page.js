"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useParams } from 'next/navigation';
import Loader from '@/components/ui/Loader';

const FormAnalyticsDashboard = () => {
  const [formData, setFormData] = useState(null);
  const [chartType, setChartType] = useState('bar'); // State to manage chart type
  const { formId } = useParams();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/form/${formId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, [formId]);

  if (!formData) return <Loader/>;

  // Calculate bounce rate
  const totalViews = formData.views || 0;
  const totalSubmissions = formData.responses.length;
  const bounceRate = totalViews !== 0 ? ((totalViews - totalSubmissions) / totalViews) * 100 : 0;


  const submissionData = formData.responses.map(response => {
    const date = new Date(response.submittedAt);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    return {
      datetime: formattedDate,
      count: 1 
    };
  });

  // Aggregate submissions by datetime
  const groupedData = submissionData.reduce((acc, cur) => {
    const formattedDatetime = cur.datetime.toLocaleString(); 
    const index = acc.findIndex(item => item.datetime === formattedDatetime);
    if (index !== -1) {
      acc[index].count += 1;
    } else {
      acc.push({ datetime: formattedDatetime, count: 1 });
    }
    return acc;
  }, []);

  // Prepare data for the pie chart of select type elements
  const selectTypeResponses = formData.responses.filter(response =>
    response.responses.some(res => res.elementId.startsWith('select'))
  );

  const selectOptionsCount = selectTypeResponses.reduce((acc, response) => {
    const selectResponse = response.responses.find(res => res.elementId.startsWith('select'));
    const option = selectResponse.value;

    if (acc[option]) {
      acc[option] += 1;
    } else {
      acc[option] = 1;
    }

    return acc;
  }, {});

  const selectTypeData = Object.keys(selectOptionsCount).map(option => ({
    option,
    count: selectOptionsCount[option]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };



  

  return (
    <div className="container mx-auto p-4">

           {/* Form Title and Description Meta data*/}
           <div className="flex flex-col items-center justify-center mb-5">
      <h1 className="text-2xl font-bold mt-8">{formData.title}</h1>
      <p className="text-gray-600">{formData.description}</p>
      <p className='text-green-600'>Form URL : {`${process.env.NEXT_PUBLIC_CLIENT_URL}/forgeform/${formId}`}</p>
      </div>
    


      <div className="grid grid-cols-3 gap-4 text-white">
        {/* Total Views */}
        <div className="bg-red-600 shadow-md rounded-lg p-4">
          <p className="text-lg font-semibold">Total Views</p>
          <p className="text-2xl">{totalViews}</p>
        </div>

        {/* Total Submissions */}
        <div className="bg-blue-600 shadow-md rounded-lg p-4">
          <p className="text-lg font-semibold">Total Submissions</p>
          <p className="text-2xl">{totalSubmissions}</p>
        </div>

        {/* Bounce Rate */}
        <div className="bg-green-600 shadow-md rounded-lg p-4">
          <p className="text-lg font-semibold">Bounce Rate</p>
          <p className="text-2xl">{bounceRate.toFixed(2)}%</p>
        </div>
      </div>

 

      {/* Time series chart */}
      <div className="mt-4" style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={groupedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip labelFormatter={(value) => new Date(value).toLocaleString()} />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>


      <h2 className="text-xl font-semibold">Analytics</h2>


      {/* Toggle between Pie and Bar chart */}
      <div className="mt-4 flex items-center">

        <span className="mr-2">View:</span>
        <button
          className={`mr-2 px-4 py-2 rounded ${
            chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleChartTypeChange('bar')}
        >
          Bar Chart
        </button>
        <button
          className={`px-4 py-2 rounded ${
            chartType === 'pie' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleChartTypeChange('pie')}
        >
          Pie Chart
        </button>
      </div>
  
      {/* Select Type Responses Chart */}
      {chartType === 'bar' ? (
        <div className="mt-8">
       
          <div className="mt-4" style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={selectTypeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="option" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="mt-8">
       
          <div className="mt-4" style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={selectTypeData}
                  dataKey="count"
                  nameKey="option"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {selectTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      

      {/* Display individual responses */}
      <div className="mt-8">
        <h1 className='text-2xl font-bold '> All Responses</h1>
        <div className="mt-8 flex flex-col gap-3 flex-wrap md:flex-row">
          {formData.responses.map(response => (
            <div key={response._id} className="border rounded-2xl p-4 mb-4 bg-green-500 text-white min-w-md  max-w-lg flex-1">
              <p className="font-semibold">Submitted by: {response.userId}</p>
              <p className="text-sm text-white">Submitted at: {new Date(response.submittedAt).toLocaleString()}</p>
              <hr className="my-2" />
              <ul >
                {response.responses.map(res => (
                  <li key={res._id}>
                    <div className='flex gap-x-2 items-center  '>
                  
                      <strong>{res.label}:</strong>

                      {res.elementId === 'file' ? (
                        <a href={res.value} target="_blank" rel="noopener noreferrer" className="ml-2">
                          <img width="20" height="20" src="https://img.icons8.com/ios/50/FFFFFF/downloads.png" alt="downloads" />
                        </a>
                      ) : (
                        <span className="ml-2">{res.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormAnalyticsDashboard;
