// FeedbackForm.jsx
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Rating } from '@mui/material';
import logo from '../assests/logo.jpeg';

const FeedbackForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const handleLogout = () => {
        navigate('/');
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();

        const feedbackData = {
            name,
            phone,
            rating,
            feedback
        };

        try {
            await axios.post('http://localhost:5000/api/feedback', feedbackData);
            alert('Feedback submitted successfully');
            setName('');
            setPhone('');
            setRating(0);
            setFeedback('');
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
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
                    {/* <Link to="/user/saved-recipes" className="nav-link">Saved Recipes</Link> */}
                    <Link to="/user/feedback" className="nav-link">Feedback</Link>
                </div>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </nav>
        
        <Box p={3}>
            <h2>Submit Feedback</h2>
            <form onSubmit={handleFeedbackSubmit}>
                <TextField
                    label="Name"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Phone Number"
                    fullWidth
                    margin="normal"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                    />
                </Box>
                <TextField
                    label="Feedback"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>
        </Box>
        </div>
)};

export default FeedbackForm;
