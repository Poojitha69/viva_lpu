import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <p className="switch-text">Don’t have an account?</p>
        <button
          className="switch-button"
          onClick={() => navigate('/register')}
        >
          Click here to Register
        </button>
      </div>
    </div>
  );
}

export default Login;
