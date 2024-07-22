import React, { useEffect, useState } from 'react';
import './Style.css';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import first from './img/first.jpg';
import second from './img/second.jpg';
import third from './img/third.jpg';
import General from './img/General.png';

const Home = () => {
    useEffect(() => {
        const elements = document.querySelectorAll('.list .items');

        function callback(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }

        const observer = new IntersectionObserver(callback, {
            threshold: 0.1 // Adjust this value to control when the animation triggers
        });

        elements.forEach(element => {
            observer.observe(element);
        });

        return () => {
            elements.forEach(element => {
                observer.unobserve(element);
            });
        };
    }, []);

    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 3;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, [totalSlides]);

    const slides = [
        {
            image: first,
            items: [
                "Налагодити стосунки з близькими людьми",
                "Навчитися відстоювати особисті кордони"
            ]
        },
        {
            image: second,
            items: [
                "Впоратися зі стресом, тривогою і страхом",
                "Пережити зміни: переїзд, розставання"
            ]
        },
        {
            image: third,
            items: [
                "Прийняти себе і підвищити самооцінку",
                "Зрозуміти, чому на роботі проблеми"
            ]
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    };

    const handlers = useSwipeable({
        onSwipedLeft: nextSlide,
        onSwipedRight: prevSlide,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

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
                <div className="secH" {...handlers}>
                    <div className="imgH">
                        {slides.map((slide, index) => (
                            <img key={index} src={slide.image} alt="" className="imgs" style={{ display: currentSlide === index ? 'block' : 'none' }} />
                        ))}
                    </div>
                    <div className="list">
                        <div className={`full-list`}>
                            {slides.map((slide, slideIndex) => (
                                <div key={slideIndex} className={`slide ${currentSlide === slideIndex ? 'active' : ''}`}>
                                    {slide.items.map((item, index) => (
                                        <p key={index} className="items">{item}</p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="dots">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
