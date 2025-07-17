import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
    <form onSubmit={onSubmit}>
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={onChange} required />
      <input name="email" placeholder="Email" onChange={onChange} required />
      <input name="password" type="password" placeholder="Password" onChange={onChange} required />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
