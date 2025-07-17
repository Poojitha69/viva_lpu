import React, { useState, useEffect } from 'react';
import api from '../api';
import TaskItem from './TaskItem';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error('Fetch tasks error:', err);
        navigate('/login');
      }
    };
    fetchTasks();
  }, [navigate]); // ✅ Added navigate as dependency

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      const res = await api.post('/tasks', { title });
      setTasks([res.data, ...tasks]);
      setTitle('');
    } catch (err) {
      console.error('Add task error:', err);
      alert('Failed to add task');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h2>My Todo List</h2>
      <input
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} fetchTasks={() => setTasks(tasks)} />
        ))}
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
