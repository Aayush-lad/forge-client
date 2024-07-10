// src/App.js
"use client"
import React, { useState,useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';

const FormBuilder = () => {
  const [formElements, setFormElements] = useState([]);
  const [formSettings, setFormSettings] = useState({
    closingDate: '',
    allowEditAfterSubmission: false,
    allowMultipleResponses: false,
  });
  const router = useRouter();

  useEffect(() => {

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formattedDate = tomorrow.toISOString().split('T')[0];

    setFormSettings((prevSettings) => ({
      ...prevSettings,
      closingDate: formattedDate,
    }));
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFormElements((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addFormElement = (type) => {
    const newElement = {
      id: `${type}-${Date.now()}`,
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      options: type === 'select' ? ['Option 1', 'Option 2', 'Option 3'] : [],
      required: false,
    };
    setFormElements([...formElements, newElement]);
  };

  const updateLabel = (id, newLabel) => {
    setFormElements((items) =>
      items.map(item => (item.id === id ? { ...item, label: newLabel } : item))
    );
  };

  const updateOptions = (id, newOptions) => {
    setFormElements((items) =>
      items.map(item => (item.id === id ? { ...item, options: newOptions } : item))
    );
  };

  const toggleRequired = (id) => {
    setFormElements((items) =>
      items.map(item => (item.id === id ? { ...item, required: !item.required } : item))
    );
  };

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/form/create`,
        JSON.stringify({formElements, formSettings}),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
  
      if (response) {
        toast.success('Form created successfully!');
        router.push(`/forms/${response.data.form._id}/formdashboard`);
      } else {
        alert('Failed to submit form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form.');
    }
  };

  const FormElementsOptions =[
    {
      title:'Text Input',
      url:'https://img.icons8.com/?size=200&id=bkvFLltNGV8a&format=png&color=FFFFFF',
      onClick : () => addFormElement('text')
    },
    {
      title:'File Input',
      url:'https://img.icons8.com/?size=100&id=11651&format=png&color=FFFFFF',
      onClick : () => addFormElement('file')
    },
    {
      title:'Checkbox',
      url:'https://img.icons8.com/?size=100&id=11697&format=png&color=FFFFFF',
      onClick : () => addFormElement('checkbox')
    },
    {
      title:'Title',
      url:'https://img.icons8.com/?size=100&id=46180&format=png&color=FFFFFF',
      onClick : () => addFormElement('title')
    },
    {
      title:'Subtitle',
      url:'https://img.icons8.com/?size=100&id=Q6iVwPNqV1FD&format=png&color=FFFFFF',
      onClick : () => addFormElement('subtitle')
    },
    {
      title:'Date Input',
      url:'https://img.icons8.com/?size=100&id=23&format=png&color=FFFFFF',
      onClick : () => addFormElement('date')
    },
    {
      title:'Select Input',
      url:'https://img.icons8.com/?size=100&id=11205&format=png&color=FFFFFF',
      onClick : () => addFormElement('select')
    }
  ]

  return (
    <div className="flex">
      <div className="w-1/4 p-4 border-r">
        <h2 className="text-lg font-bold ">Add Form Element</h2>
        <p className='text-sm text-gray-500 mb-4'>(click to add the element)</p>

        {/* all form element options 2 form element per row */}
        <div className='flex'></div>
        {FormElementsOptions.map((item,index) => (
          <button key={index} className="bg-blue-500 text-white py-2 px-4 rounded mb-2 w-[100px] m-2 flex flex-col items-center justify-center" title={item.title} onClick={item.onClick}>
            <Image src={item.url}  height={40} width={40} alt={item.title}/>
            <p>{item.title}</p>
          </button>
        ))}
      


        <h2 className="text-lg font-bold mt-6 mb-4">Form Settings</h2>
        <label className="block mb-2">
          <span className="text-gray-700">Form Title</span>
          <input 
            type="text"
            name="title"
            value={formSettings.title}
            onChange={handleSettingsChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Form Description</span>
          <input 
            type="text"
            name="description"
            value={formSettings.description}
            onChange={handleSettingsChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </label>
        
        <label className="block mb-2">
          <span className="text-gray-700">Closing Date</span>
          <input 
            type="datetime-local"
            name="closingDate"
            value={formSettings.closingDate}
            onChange={handleSettingsChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          <input 
            type="checkbox"
            name="allowEditAfterSubmission"
            checked={formSettings.allowEditAfterSubmission}
            onChange={handleSettingsChange}
            className="mr-2"
          />
          Allow Edit After Submission [Under Development]
        </label>
        <label className="block mb-2">
          <input 
            type="checkbox"
            name="allowMultipleResponses"
            checked={formSettings.allowMultipleResponses} 
            onChange={handleSettingsChange}
            className="mr-2"
          />
          Allow Multiple Responses [Under Development]
        </label>
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-lg font-bold ">Form Preview</h2>
        <p className='text-sm text-red-500 '>(** Drag and Drop to rearrange the form elements)</p>
        <p className='text-sm text-red-500 mb-4'>(** Change the field name by double clicking on it)</p>

        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={formElements}>
            {formElements.map((element) => (
              <SortableItem key={element.id} id={element.id} element={element} updateLabel={updateLabel} updateOptions={updateOptions} toggleRequired={toggleRequired} />
            ))}
          </SortableContext>
        </DndContext>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white py-2 px-4 rounded mt-4 w-full"
        >
          Create Form
        </button>
      </div>
    </div>
  );
};

const SortableItem = ({ id, element, updateLabel, updateOptions, toggleRequired }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const [isEditing, setIsEditing] = useState(false);
  const [newOption, setNewOption] = useState("");

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const handleDoubleClick = () => setIsEditing(true);

  const handleBlur = () => setIsEditing(false);

  const handleChange = (e) => {
    updateLabel(id, e.target.value);
  };

  const handleAddOption = () => {
    if (newOption.trim()) {
      updateOptions(id, [...element.options, newOption.trim()]);
      setNewOption("");
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...element.options];
    newOptions[index] = value;
    updateOptions(id, newOptions);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="form-element bg-gray-100 p-4 rounded mb-2 shadow-md">
      {isEditing ? (
        <input
          type="text"
          value={element.label}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border border-gray-300 p-2 rounded w-full"
        />
      ) : (
        <label
          className="block text-sm font-medium mb-2 cursor-pointer"
          onDoubleClick={handleDoubleClick}
          {...(!isEditing && listeners)}
        >
          {element.label} {element.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <button
        onClick={() => toggleRequired(id)}
        className={`text-white py-1 px-2 rounded mb-2 ${element.required ? 'bg-red-500' : 'bg-gray-500'}`}
      >
        {element.required ? 'Required' : 'Optional'}
      </button>
      {element.type === 'text' && <input type="text" className="border border-gray-300 p-2 rounded w-full" />}
      {element.type === 'file' && <input type="file" className="border border-gray-300 p-2 rounded w-full" />}
      {/* {element.type === 'mcq' && (
        <div>
          <input type="radio" className="border border-gray-300 p-2 rounded mr-2" /> Option 1
          <input type="radio" className="border border-gray-300 p-2 rounded ml-4 mr-2" /> Option 2
          <input type="radio" className="border border-gray-300 p-2 rounded ml-4 mr-2" /> Option 3
        </div>
      )} */}
      {element.type === 'checkbox' && <input type="checkbox" className="border border-gray-300 p-2 rounded" />}
      {element.type === 'title' && <h1 className="text-xl font-bold">{element.label}</h1>}
      {element.type === 'subtitle' && <h2 className="text-lg font-semibold">{element.label}</h2>}
      {element.type === 'date' && <input type="date" className="border border-gray-300 p-2 rounded w-full" />}
      {element.type === 'select' && (
        <div>
          <select className="border border-gray-300 p-2 rounded w-full mb-2">
            {element.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          {element.options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mr-2"
              />
            </div>
          ))}
          <div className="flex items-center">
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mr-2"
              placeholder="Add new option"
            />
            <button
              onClick={handleAddOption}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="App container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Form Builder</h1>
      <FormBuilder />
    </div>
  );
};

export default App;
