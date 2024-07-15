"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Loader from '@/components/ui/Loader';

const RenderForm = () => {
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const { formId } = useParams();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/form/${formId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = response.data;
        setForm(data);
        setIsEditable(data.formSettings.editAfterSubmission);
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    };

    fetchForm();
  }, [formId]);

  const handleChange = (id, value,label) => {
    setResponses({
      ...responses,
      [id]: {value,label},
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('formId', formId);

  
      Object.entries(responses).forEach(([key, value]) => {
     
        
        formData.append(key, JSON.stringify(value));
      });

      // Append file to FormData if exists

      if (responses.file && responses.file.value instanceof File) {
       
        formData.append('file',responses.file.value);
      }

      console.log(formData);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/form/submit-form`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

  

      setIsSubmitted(true);
    
    } catch (error) {
      console.error('Error submitting form:', error);
     
    }
  };
  if (!form) {
    return <Loader/>
  }

  const currentDateTime = new Date();
  const closingDateTime = new Date(form.closeDate);

  if (currentDateTime > closingDateTime) {
    return <div>The form is closed and no longer accepting responses.</div>;
  }

  if (isSubmitted && !isEditable) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <span>Thank you for your submission!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <span className='flex justify-center items-center'>Powered by <Image src="/logo.png" alt="Forge Logo" width={72} height={72} /></span>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <form onSubmit={handleSubmit} className="bg-white py-8 px-6 shadow rounded-lg sm:px-10" >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{form.title}</h2>
          <p className="mb-4 text-gray-600">{form.description}</p>
          {form.formElements.map((element) => (
            <div key={element.id} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {element.label}
                {element.required && <span className="text-red-500">*</span>}
              </label>
              {element.type === 'text' && (
                <input
                  type="text"
                  className="border border-gray-300 p-2 rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => handleChange(element.id, e.target.value,element.label)}
                  required={element.required}
                />
              )}
              {element.type === 'file' && (
                <input
                  type="file"
                  name={element.id} // Use element id as name to identify file in responses
                  className="border border-gray-300 p-2 rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => setResponses({ ...responses, file: {value:e.target.files[0],label:element.label}  })}
                  required={element.required}
                />
              )}
              {element.type === 'mcq' && (
                element.options.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`${element.id}-${index}`}
                      name={element.id}
                      value={option}
                      className="mr-2 focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={(e) => handleChange(element.id, e.target.value,element.label)}
                      required={element.required}
                    />
                    <label htmlFor={`${element.id}-${index}`}>{option}</label>
                  </div>
                ))
              )}
              {element.type === 'checkbox' && (
                <input
                  type="checkbox"
                  className="border border-gray-300 p-2 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => handleChange(element.id, e.target.checked,element.label)}
                />
              )}
              {element.type === 'date' && (
                <input
                  type="date"
                  className="border border-gray-300 p-2 rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => handleChange(element.id, e.target.value,element.label)}
                  required={element.required}
                />
              )}
              {element.type === 'select' && (
                <select
                  className="border border-gray-300 p-2 rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => {console.log(e.target.value);handleChange(element.id, e.target.value,element.label)}}
                  required={element.required}
                >
                  <option value="">Select an option</option>
                  {element.options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded w-full hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RenderForm;
