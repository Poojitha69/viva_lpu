import React, { useState } from 'react';
import api from '../api';

function TaskItem({ task, fetchTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  // ✅ Toggle task completion
  const toggleComplete = async () => {
    try {
      await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
      alert('Failed to update task');
    }
  };

  // ✅ Update task title
  const updateTask = async () => {
    if (!editTitle.trim()) return alert('Title cannot be empty!');
    try {
      await api.put(`/tasks/${task._id}`, { title: editTitle });
      setIsEditing(false);
      fetchTasks();
    } catch (err) {
      console.error('Error updating title:', err);
      alert('Failed to update title');
    }
  };

  // ✅ Delete task
  const deleteTask = async () => {
    try {
      await api.delete(`/tasks/${task._id}`);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task');
    }
  };

  return (
    <li style={styles.taskItem}>
      {isEditing ? (
        <>
          <input
            style={styles.input}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <button style={styles.saveBtn} onClick={updateTask}>💾 Save</button>
          <button style={styles.cancelBtn} onClick={() => setIsEditing(false)}>❌ Cancel</button>
        </>
      ) : (
        <>
          <span
            onClick={toggleComplete}
            style={{
              ...styles.title,
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? 'gray' : 'black'
            }}
          >
            {task.title}
          </span>
          <button style={styles.editBtn} onClick={() => setIsEditing(true)}>✏️ Edit</button>
          <button style={styles.deleteBtn} onClick={deleteTask}>🗑️ Delete</button>
        </>
      )}
    </li>
  );
}

const styles = {
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#fff',
    padding: '10px 15px',
    margin: '8px 0',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  title: {
    cursor: 'pointer',
    flex: 1,
  },
  input: {
    flex: 1,
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  editBtn: {
    marginLeft: '10px',
    background: '#ffc107',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  saveBtn: {
    marginLeft: '10px',
    background: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  cancelBtn: {
    marginLeft: '5px',
    background: '#6c757d',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  deleteBtn: {
    marginLeft: '10px',
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
};

export default TaskItem;
