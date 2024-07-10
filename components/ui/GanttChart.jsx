import React from 'react';
import Sidebar from './Sidebar'; // Replace with your sidebar component path
import { Gantt, Task } from 'gantt-task-react'; // Import Gantt and Task components
import 'gantt-task-react/dist/index.css';

const GanttChart = ({ tasks }) => {

  if(tasks.length==0){
    return <div className='font-bold text-2xl flex items-center justify-center'>
      <h1>No tasks found</h1>
    </div>
  }
  console.log(tasks)
  const ganttTasks = tasks.map((task) => ({
    id: task._id,
    name: task.title,
    start: new Date(task.startDate),
    end: new Date(task.endDate),
    type: 'task',
    isDisabled: false,
  }));

  return (
    <div className="relative h-full">
      <Sidebar />
      <div className="absolute top-0 left-0 w-full h-full bg-green-500 z-0 ml-2">
        {/* Adjust left-64 based on your sidebar width */}
        <Gantt tasks={ganttTasks} />
      </div>
    </div>
  );
};

export default GanttChart;
