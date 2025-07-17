import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={onSubmit}>
          <input
            name="name"
            placeholder="Name"
            onChange={onChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            onChange={onChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={onChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p className="switch-text">Already have an account?</p>
        <button
          className="switch-button"
          onClick={() => navigate('/login')}
        >
          Click here to Login
        </button>
      </div>
    </div>
  );
}

export default Register;
