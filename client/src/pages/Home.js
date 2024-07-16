import React, { useEffect } from 'react';
import './Style.css';
import { Link } from 'react-router-dom';
import first from './img/first.jpg';
import second from './img/second.jpg';
import third from './img/third.jpg';
import General from './img/General.png';

const Home = () => {
    useEffect(() => {
        const elements = document.querySelectorAll('.animate-on-scroll .items');

        function callback(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }

        const observer = new IntersectionObserver(callback);

        elements.forEach(element => {
            observer.observe(element);
        });

        return () => {
            elements.forEach(element => {
                observer.unobserve(element);
            });
        };
    }, []); 

        return (
            <div>
               <div className="MainSect">
                    <div className="startSec"> 
                        <h3>
                            Ми вам допоможем знайти психолога та зв'язатись з ним
                        </h3>
                        <div className="SecB">
                            <Link to="/List"> Вибрати психолога</Link>
                        </div>
                    </div>
                        <img className="imgPsh" src={General} alt="ds" />
                </div>
                <div className="Helping animate-on-scroll">
                    <h3 className="helps">
                        З чим допомагає <span className="highlight">психолог</span>?
                    </h3>
                    <div className="secH">
                        <div className="imgH">
                            <img src={first} alt="" className="imgs" />
                            <img src={second} alt="" className="imgs" />    
                            <img src={third} alt="" className="imgs" />
                        </div>
                        <div className="list"> 
                            <p className="items">
                                Налагодити стосунки з близькими людьми
                            </p>
                            <p className="items">
                               Впоратися зі стресом, тривогою і страхом
                            </p>
                            <p className="items">
                               Прийняти себе і підвищити самооцінку
                            </p>
                            <p className="items">
                               Навчитися відстоювати особисті кордони
                            </p>
                            <p className="items">
                               Пережити зміни: переїзд, розставання
                            </p>
                            <p className="items">
                               Зрозуміти, чому на роботі проблеми 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


export default Home;