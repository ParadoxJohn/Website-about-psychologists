import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './StyleHeader.css'
import lockImage from './img/lock.png';


class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="logo">
                <Link to="/"><span className="highlight">ПОРЯД</span></Link>
                </div>
                <div className="RightNav">
                <div className="nav">
                <Link to="/auth/register">Реєстрація</Link> 
                </div>
                <div className="navAc link">
                <img src={lockImage} alt="Lock" />
                    <Link to="/Login">Вхід</Link>
                </div>
                <div className="MBut">
                    <Link to="/List"> Вибрати психолога</Link>
                </div>
                </div>
            </div>
        );
    }
}

export default Header;