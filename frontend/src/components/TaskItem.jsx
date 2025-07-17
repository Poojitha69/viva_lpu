import React from 'react';
import api from '../api';

function TaskItem({ task, fetchTasks }) {
  // ✅ Toggle complete status
  const toggleComplete = async () => {
    try {
      await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
      alert('Failed to update task');
    }
  };

  // ✅ Delete task
  const deleteTask = async () => {
    console.log('Deleting Task ID:', task._id); // Debug
    try {
      await api.delete(`/tasks/${task._id}`);
      console.log('Task deleted successfully');
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err.response || err);
      alert('Failed to delete task');
    }
  };

  return (
    <li style={styles.taskItem}>
      <span
        style={{
          ...styles.taskText,
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? '#888' : '#333',
        }}
        onClick={toggleComplete}
      >
        {task.title}
      </span>
      <button style={styles.deleteBtn} onClick={deleteTask}>
        🗑️ Delete
      </button>
    </li>
  );
}

const styles = {
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    borderRadius: '6px',
    padding: '14px 12px',
    marginBottom: '14px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    width: '100%',
  },
  taskText: {
    flex: 1,
    fontSize: '18px',
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '8px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default TaskItem;
