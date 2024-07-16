import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './StyleHeader.css'
import lockImage from './img/lock.png';

class Header extends Component {
    state = {
        menuOpen: false
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            menuOpen: !prevState.menuOpen
        }));
    }

    render() {
        return (
            <div className="header">
                <div className="logo">
                    <Link to="/"><span className="highlight">ПОРЯД</span></Link>
                </div>
                <div className={`hamburger ${this.state.menuOpen ? 'open' : ''}`} onClick={this.toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={`RightNav ${this.state.menuOpen ? 'open' : ''}`}>
                <div className="nav">
                    <Link to="/auth/register">Реєстрація</Link> 
                </div>
                    <div className="navAc link">
                        <img className='lock' src={lockImage} alt="Lock" />
                        <Link to="/Login">Вхід</Link>
                    </div>
                    <div className="MBut">
                        <Link to="/List">Вибрати психолога</Link>
                    </div>
                </div>  
            </div>
        );
    }
}

export default Header;