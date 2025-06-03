import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.toLowerCase().trim(), // Ensure normalized email
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <AuthStyled>
      <h1 className="expense-tracker-title">Expense Tracker</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Welcome Back</h2>
          <p>Please enter your details to login.</p>
        </div>
        {error && <p className="error-message">{error}</p>}
        <label>
          <h4>
            <b>Email</b>
          </h4>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <h4>
            <b>Password</b>
          </h4>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </AuthStyled>
  );
}

const AuthStyled = styled.div`
  height: 100vh;
  background: #fcf6f9;
  padding: 10rem;
  display: flex;
  flex-direction: column;

  .expense-tracker-title {
    position: absolute;
    top: 1rem;
    left: 2rem;
    font-size: 1.5rem;
    color: black;
  }

  form {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1);
    width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .form-header {
      text-align: center;
      margin-bottom: 1rem;

      h2 {
        font-size: 1.2rem;
        margin: 0.5rem 0;
        color: black;
      }

      p {
        font-size: 0.9rem;
        color: #555;
      }
    }

    .error-message {
      color: red;
      font-size: 0.9rem;
    }

    input {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ccc;
      border-radius: 10px;
      font-size: 1rem;
    }

    button {
      width: 100%;
      padding: 0.8rem;
      border: none;
      background: #6c63ff;
      color: white;
      border-radius: 20px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #574b90;
      }
    }

    a {
      color: #6c63ff;
      text-decoration: none;
    }
  }
`;

export default Login;
