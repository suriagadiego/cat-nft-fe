import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch('http://127.0.0.1:8000/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setLoggedIn(true);
        localStorage.setItem("access", data.access);
        navigate("/list-pets");
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setFormData({
      username: '',
      password: ''
    });
    setError('');
  };

  if (loggedIn) {
    return (
      <div>
        <p>Welcome, {formData.username}!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  } else {
    return (
      <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn">{isLoading ? 'Logging in..' : 'Login'}</button>
      </form>
      <p>No account yet? <a href='/registration'>Register here!</a></p>
    </div>
      
    );
  }
};

export default LoginPage;
