import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [fullName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Перевірка, щоб паролі співпадали
    if (password !== confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      if (response.ok) {
        // Реєстрація успішна, можна перенаправити користувача на іншу сторінку (наприклад, логін)
        navigate('/Login');
      } else {
        // Обробка помилок реєстрації
        setError('Помилка реєстрації');
      }
    } catch (error) {
      setError('Помилка під час взаємодії із сервером');
      console.error('Помилка під час взаємодії із сервером', error);
    }
  };

  return (
    <div className="register-container">
      <h2>Реєстрація</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ім'я:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label>Підтвердіть пароль:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Зареєструватись</button>
      </form>
    </div>
  );
};

export default Register;
