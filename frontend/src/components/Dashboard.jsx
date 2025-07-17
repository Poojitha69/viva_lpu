import React, { useState, useEffect } from 'react';
import api from '../api';
import TaskItem from './TaskItem';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // ✅ Import CSS for styling

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
  }, [navigate]);

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
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h2>📝 My Todo List</h2>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
        <div className="add-task">
          <input
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTask}>➕ Add</button>
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              fetchTasks={() => setTasks(tasks)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
