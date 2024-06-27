// AddTaskModal.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

const priorityOptions = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

const statusOptions = [
  { value: 'To Do', label: 'To Do' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Done', label: 'Done' },
];

const AddTaskModal = ({ isOpen, onClose, onCreateTask }) => {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

  const onSubmit = (formdata) => {
    const data = {...formdata, priority:formdata.priority.value , status:formdata.status.value};
    onCreateTask(data);
    reset(); // Reset form fields
    onClose(); // Close the modal
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-lg">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  {...register('title', { required: true })}
                  className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${errors.title ? 'border-red-500' : ''}`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">Title is required</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register('description', { required: true })}
                  className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 h-20 resize-none ${errors.description ? 'border-red-500' : ''}`}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">Description is required</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <Controller
                  name="priority"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={priorityOptions}
                      classNamePrefix="react-select"
                      isClearable
                    />
                  )}
                />
                {errors.priority && <p className="text-red-500 text-sm mt-1">Priority is required</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={statusOptions}
                      classNamePrefix="react-select"
                      isClearable
                    />
                  )}
                />
                {errors.status && <p className="text-red-500 text-sm mt-1">Status is required</p>}

                {/* startDate */}

                <div className="mb-4">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  {...register('startDate', { required: true })}
                  className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${errors.startDate ? 'border-red-500' : ''}`}/>
                {errors.startDate && <p className="text-red-500 text-sm mt-1">Start Date is required</p>}
                </div>

                {/* endDate */}

                <div className="mb-4">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  {...register('endDate', { required: true })}
                  className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${errors.endDate ? 'border-red-500' : ''}`}/>

                {errors.endDate && <p className="text-red-500 text-sm mt-1">End Date is required</p>}

                </div>

                {/* attachments */}

                <div className="mb-4">
                <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">
                  Attachments
                </label>
                <input
                  type="file"
                  id="attachments"
                  {...register('attachments', { required: false })}
                  className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${errors.attachments ? 'border-red-500' : ''}`}/>

                {errors.attachments && <p className="text-red-500 text-sm mt-1">File is not supported</p>}

                </div>



              </div>
              <div className="flex justify-end mt-6">
                <button type="button" onClick={onClose} className="px-4 py-2 mr-2 text-gray-600 bg-gray-200 rounded-md focus:outline-none hover:bg-gray-300">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTaskModal;
