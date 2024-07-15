import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import axios from 'axios';
import loginImage from "../assests/login.jpg";
import logoImage from "../assests/logo.jpeg";
import './register.css';

const Register = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                firstName,
                lastName,
                username,
                password
            });

            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed');
        }
    };

    // const imageUrl = "../assests/login.jpg";
    return (
        <div>
            <div className="register-navbar">
                <img src={logoImage} alt="logo" className="logo" />
                <h2>Simran's Kitchen</h2>
            </div>
            <Box className="register-container">
                <img
                    src={loginImage}
                    alt="register"
                    className="register-image"
                />
                <Box className="register-form-container">
                    <img
                        src={logoImage}
                        alt="logo"
                        className="logo-form"
                    />
                    <Box className="register-form">
                        <h2>Register</h2>
                        <form onSubmit={handleRegister}>
                            <TextField
                                label="Firstname"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextField
                                label="Lastname"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <TextField
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                className="register-button"
                            >
                                Register
                            </Button>
                        </form>
                        {message && <p>{message}</p>}
                    </Box>
                </Box>
            </Box>
        </div>
    )

}

export default Register;