import React, { useState, useEffect } from 'react';

import { toast } from "react-toastify";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const token = '';
  
  React.useEffect(() => {
    // Fetch questions from backend API
    const fetchTasks = async () => {
      
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/task/searchTaskByUsers`, {
                  headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }}); 
              if (response.ok) {
                const data = await response.json();
                if (data) {
                    setTasks(data.data);
                    
                }
              } else {
                toast.error("Failed to fetch Task data");

              }
            } catch (error) {
                toast.error(error);
            }
           };
    
    fetchTasks();
    
    
    console.log(tasks);
  },  [tasks]);
 

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>{task.title}</div>
        
      ))}
      <div>task</div>
    </div>
  );
};

export default Task;
