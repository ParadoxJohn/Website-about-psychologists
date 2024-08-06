import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Home from './pages/Home.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import PsychologistList from './pages/PsychologistList.js';
import AddPsychologist from './pages/AddList.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(token);
    setIsAuthenticated(true);
  };
  

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/List"
          element={<PsychologistList />}
        />
        <Route
          path="/AddPsychologist"
          element={isAuthenticated ? <AddPsychologist /> : <Navigate to="/Login" />}
        />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;