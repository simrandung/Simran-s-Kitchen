import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import './navbar.css';
import logo from '../assests/logo.jpeg';
import backgroundImage1 from '../assests/bg.jpg';
import backgroundImage2 from '../assests/bg2.jpg';
import backgroundImage3 from '../assests/pizza.jpg';
// import aboutMeImage from '../assests/pizza.jpg';
import t1 from '../assests/t1.jpg';
import t2 from '../assests/t2.jpg';
import t3 from '../assests/t3.jpg';
import r1 from '../assests/r1.jpg';
import r2 from '../assests/r2.jpg';
import r3 from '../assests/r3.jpg';
import r4 from '../assests/samosa.jpg'
import introPic from '../assests/intro.jpg';

Modal.setAppElement('#root'); // Add this line to ensure accessibility

const Navbar = () => {
    const latestRecipes = [
        {
            _id: "1",
            title: "Spaghetti Carbonara",
            ingredients: "Spaghetti, eggs, pancetta, parmesan cheese, black pepper",
            instructions: "Boil spaghetti. Fry pancetta. Mix eggs and cheese. Combine all.",
            imageUrl: r1
        },
        {
            _id: "2",
            title: "Chicken Curry",
            ingredients: "Chicken, onions, tomatoes, garlic, ginger, spices",
            instructions: "Cook onions. Add spices. Add chicken and tomatoes. Simmer.",
            imageUrl: r2
        },
        {
            _id: "3",
            title: "Chocolate Cake",
            ingredients: "Flour, sugar, cocoa powder, eggs, milk, butter",
            instructions: "Mix dry ingredients. Add wet ingredients. Bake.",
            imageUrl: r3
        },
        {
            _id: "4",
            title: "Samosa",
            ingredients: "Potatoes, peas, spices, and pastry dough",
            instructions: " Boil, mash, mix, fill, fold, and fry until golden brown.",
            imageUrl: r4
        }
    ];

    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const testimonials = [
        {
            name: "John Doe",
            photo: t1,
            rating: 5,
            feedback: "Amazing recipes! I've tried several and they all turned out great."
        },
        {
            name: "Jane Smith",
            photo: t2,
            rating: 4,
            feedback: "Really loved the variety and simplicity of the recipes."
        },
        {
            name: "Bob Johnson",
            photo: t3,
            rating: 5,
            feedback: "Perfect for my family's tastes. Highly recommend!"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <nav className="navbar-h">
                <div className="navbar-left-h">
                    <img src={logo} alt="logo" className="logo" />
                    <h1 className="name">Simran's Kitchen</h1>
                </div>
                <div className="navbar-right-h">
                    <Link to='/login'>
                        <button className="desktopMenuBtn">Login</button>
                    </Link>
                    <Link to='/register'>
                        <button className="desktopMenuBtn">Register</button>
                    </Link>
                </div>
            </nav>
            <div className="background-container">
                <img src={backgroundImage1} alt="Background 1" className="background-image image1" />
                <img src={backgroundImage2} alt="Background 2" className="background-image image2" />
                <img src={backgroundImage3} alt="Background 3" className="background-image image3" />
            </div>
            <div className="latest-recipe-container">
                <h1>Latest Recipe</h1>
                <div className="recipe-cards-container">
                    {latestRecipes.map(recipe => (
                        <div key={recipe._id} className="recipe-card">
                            {recipe.imageUrl && (
                                <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
                            )}
                            <h3>{recipe.title}</h3>
                            <p>{recipe.ingredients.substring(0, 100)}...</p>
                            <p>{recipe.instructions.substring(0, 100)}...</p>
                            <button onClick={openModal} className="read-more-button">Read More</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="about-me-container">
                <div className="about-me-content">
                    <h2>About Me</h2>
                    <p>Welcome to Simran's Kitchen! I am Simran, a passionate cook who loves to explore and share new recipes. Cooking has always been a joyful experience for me, and I hope to bring that joy into your kitchen through my recipes. Stay tuned for more delicious creations!</p>
                </div>
                <div className="about-me-image">
                    <img src={introPic} alt="About Me" />
                </div>
            </div>
            <div className="testimonials-container">
                <div className="testimonial-card active">
                    <img src={testimonials[activeTestimonial].photo} alt={testimonials[activeTestimonial].name} className="testimonial-photo" />
                    <h3>{testimonials[activeTestimonial].name}</h3>
                    <div className="star-rating">
                        {"★".repeat(testimonials[activeTestimonial].rating)}
                    </div>
                    <p>{testimonials[activeTestimonial].feedback}</p>
                </div>
                <div className="dots">
                    {testimonials.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${activeTestimonial === index ? 'active' : ''}`}
                            onClick={() => setActiveTestimonial(index)}
                        />
                    ))}
                </div>
            </div>
            <div className="footer-div">
                <p>© 2024 Simran's Kitchen. All rights reserved.</p>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Login or Register"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Please Login or Register</h2>
                <p>You need to be logged in to view the full recipe.</p>
                <div className="modal-buttons">
                    <Link to="/login" className="modal-button" onClick={closeModal}>Login</Link>
                    <Link to="/register" className="modal-button" onClick={closeModal}>Register</Link>
                </div>
                <button onClick={closeModal} className="modal-ok-button">OK</button>
            </Modal>
        </div>
    );
};

export default Navbar;
