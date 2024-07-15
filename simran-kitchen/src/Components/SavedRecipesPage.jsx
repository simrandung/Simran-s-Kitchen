import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assests/logo.jpeg';
// import './SavedRecipesPage.css';

const SavedRecipesPage = () => {
    const navigate = useNavigate();
    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/saved-recipes');
                setSavedRecipes(response.data);
            } catch (error) {
                console.error('Error fetching saved recipes:', error);
            }
        };

        fetchSavedRecipes();
    }, []);

    const handleLogout = () => {
        navigate('/');
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
                        <Link to="/user/saved-recipes" className="nav-link">Saved Recipes</Link>
                        <Link to="/user/feedback" className="nav-link">Feedback</Link>
                    </div>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </nav>

            <div className="recipes-container">
                {savedRecipes.map(recipe => (
                    <div key={recipe._id} className="recipe-card">
                        <h3>{recipe.title}</h3>
                        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                        <p><strong>Instructions:</strong> {recipe.instructions}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedRecipesPage;
