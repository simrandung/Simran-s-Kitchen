import React, { useState } from "react";
import { Box,TextField,Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import loginImage from "../assests/login.jpg";
import logoImage from "../assests/logo.jpeg";
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(username,password);

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username,
                password
            });

            setMessage(response.data.message);
            if (username === 'admin') {
                navigate('/admin');
            } else {
                navigate('/user');
            }
            
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed');
        }
    };
    
    // const imageUrl = "../assests/login.jpg";
    return (
        <div>
            <div className="login-navbar">
                <img src={logoImage} alt="logo" className="logo" />
                <h2>Simran's Kitchen</h2>
            </div>
        <Box className="login-container">
            <img
                src={loginImage}
                alt="login"
                className="login-image"
            />
             <Box className="login-form-container">
                <img
                    src={logoImage}
                    alt="logo"
                    className="logo-form"
                />
            <Box className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="login-button"
                    >
                        Login
                    </Button>
                </form>
                {message && <p>{message}</p>}
            </Box>
            </Box>
        </Box>
        </div>
    )

}

export default Login;