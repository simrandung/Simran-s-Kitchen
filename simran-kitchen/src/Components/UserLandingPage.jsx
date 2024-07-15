import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assests/logo.jpeg';
import './UserLandingPage.css';

const UserLandingPage = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/recipes');
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleSaveRecipe = () => {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    const truncateText = (text, length) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt="logo" className="logo" />
                    <h1 className="name">Simran's Kitchen</h1>
                </div>
                <div className="navbar-right">
                    <div className="nav-links">
                        <Link to="/user" className="nav-link">Home</Link>
                        <Link to="/user/feedback" className="nav-link">Feedback</Link>
                    </div>
                    <div className="hamburger" onClick={toggleMobileMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
                {showMobileMenu && (
                    <div className="nav-links-mobile">
                        <Link to="/user" className="nav-link" onClick={toggleMobileMenu}>Home</Link>
                        <Link to="/user/feedback" className="nav-link" onClick={toggleMobileMenu}>Feedback</Link>
                    </div>
                )}
            </nav>

            <div className="recipes-container">
                {recipes.map(recipe => (
                    <div key={recipe._id} className="recipe-card">
                        {recipe.imageUrl && (
                            <img src={`http://localhost:5000${recipe.imageUrl}`} alt={recipe.title} />
                        )}
                        <h3>{recipe.title}</h3>
                        <p>{truncateText(recipe.ingredients, 100)}</p>
                        <p>{truncateText(recipe.instructions, 100)}</p>
                        <button onClick={handleSaveRecipe}>Save Recipe</button>
                        <button onClick={() => navigate(`/recipe/${recipe._id}`)}>Read More</button>
                    </div>
                ))}
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Your recipe has been saved!</h2>
                        <button onClick={() => setShowPopup(false)}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserLandingPage;
