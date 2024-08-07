import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://website-about-psychologists.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        setError('Неправильний логін або пароль');
        return;
      }
  
      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('Token saved:', data.token);
        onLogin(data, data.token); // Змінено тут
        navigate('/AddPsychologist');
      } else {
        console.error('No token received from server');
        setError('Помилка аутентифікації: токен не отримано');
      }
    } catch (error) {
      setError('Помилка під час взаємодії із сервером');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Пошта:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
};

export default Login;