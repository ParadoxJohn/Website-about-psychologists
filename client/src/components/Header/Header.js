import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './StyleHeader.css';
import lockImage from './img/lock.png';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        alert('Ви вийшли з акаунту');
        navigate('/');
    };

    return (
        <div className="header">
            <div className="logo">
                <Link to="/"><span className="highlight">ПОРЯД</span></Link>
            </div>
            <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={`RightNav ${menuOpen ? 'open' : ''}`}>
                <div className="nav">
                    {isAuthenticated ? (
                        <Link to="/my-account">Мій кабінет</Link>
                    ) : (
                        <Link to="/auth/register">Реєстрація</Link>
                    )}
                </div>
                <div className="navAc link">
                    <img className='lock' src={lockImage} alt="Lock" />
                    {isAuthenticated ? (
                        <button onClick={handleLogout}>Вихід</button>
                    ) : (
                        <Link to="/Login">Вхід</Link>
                    )}
                </div>
                <div className="MBut">
                    <Link to="/List">Вибрати психолога</Link>
                </div>
            </div>  
        </div>
    );
};

export default Header;