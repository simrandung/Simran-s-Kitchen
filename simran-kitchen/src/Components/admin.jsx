import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@mui/material';
import logo from '../assests/logo.jpeg';
import { Link } from "react-router-dom";
// import AddRecipe from './AddRecipe';
import './admin.css';

const Login = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecipes();
      }, []);
    
      const fetchRecipes = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/recipes');
          setRecipes(response.data);
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      };

    const handleLogout = () => {
        // Perform any logout logic here
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
                        <Link to='/admin' className="nav-link">Home</Link>
                        <Link to='/users' className="nav-link">Users</Link>
                    </div>
                
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>

            </nav>
<div className='container'>
            <Box mt={0.5} mr={2} textAlign="right">
          <Link to='/add-recipe'>
            <Button variant="contained" color="primary">
              Add Recipe
            </Button>
            </Link>
          </Box>
            <Box p={3}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Ingredients</TableCell>
                <TableCell>Instructions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipes.map((recipe) => (
                <TableRow key={recipe._id}>
                  <TableCell>
                    {recipe.imageUrl && (
                      <img src={`http://localhost:5000${recipe.imageUrl}`} alt={recipe.title} style={{ width: '100px' }} />
                    )}
                  </TableCell>
                  <TableCell>{recipe.title}</TableCell>
                  <TableCell>{recipe.ingredients}</TableCell>
                  <TableCell>{recipe.instructions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
         
        </Paper>
      </Box>
      </div>
            {/* <div className="register-navbar">
                <div className="navbar-left">
                    <img src={logoImage} alt="logo" className="logo" />
                    <h2>Simran's Kitchen</h2>
                </div>
                <div className="navbar-center">
                    <div className="nav-links">
                        <NavLink to="/profile" className="nav-link">Profile</NavLink>
                        <NavLink to="/settings" className="nav-link">Settings</NavLink>
                    </div>
                </div>
                <div className="navbar-right">
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </div> */}
        </div>
    );
};

export default Login;
