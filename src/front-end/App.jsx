import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = isLogin ? 'http://localhost:5001/login' : 'http://localhost:5001/register';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      if (isLogin) {
        alert('Login successful! Redirecting to dashboard...');
        // Redirect to the dashboard after successful login
        navigate('/dashboard');
      } else {
        alert('Registration successful! You can now log in.');
      }
    } else {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="App">
      <div className="title">AutoVault</div>

      <div className="login-container">
        <h2 style={{ color: 'white', marginBottom: '20px' }}>
          {isLogin ? 'Login to Your Account' : 'Register a New Account'}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="input-field"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="input-field"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button button">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <button
          className="register-toggle button"
          onClick={() => setIsLogin(!isLogin)}
          style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#2196f3',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          {isLogin ? 'Create an Account' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}

export default App;
