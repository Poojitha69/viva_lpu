import React from 'react';
import api from '../api';

function TaskItem({ task, fetchTasks }) {
  const toggleComplete = async () => {
    await api.put(`/tasks/${task._id}`, { completed: !task.completed });
    fetchTasks();
  };

  const deleteTask = async () => {
    await api.delete(`/tasks/${task._id}`);
    fetchTasks();
  };

  return (
    <li>
      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        onClick={toggleComplete}
      >
        {task.title}
      </span>
      <button onClick={deleteTask}>Delete</button>
    </li>
  );
}

export default TaskItem;
