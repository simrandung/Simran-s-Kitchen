// import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/navbar';
import Login from './Components/login';
import Register from './Components/register';
import Admin from './Components/admin';
import Users from './Components/users';
import AddRecipe from './Components/AddRecipe';
import UserLandingPage from './Components/UserLandingPage';
import SavedRecipesPage from './Components/SavedRecipesPage';
import FeedbackForm from './Components/FeedbackForm';
import RecipeDetail from './Components/RecipeDetail';


function App() {
  return (

    // <div>
    <Router>
        <Routes>
        <Route path="/" element={<Navbar />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/users' element={<Users />} />
        <Route path='/add-recipe' element={<AddRecipe />} />
        <Route path='/user' element={<UserLandingPage />}/>
        <Route path='/user/saved-recipes' element={<SavedRecipesPage />}/>
        <Route path='/user/feedback' element={<FeedbackForm />}/>
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </Router>
    // </div>

  );
}

export default App;

// Filename - App.js

// import "./App.css";
// // importing components from react-router-dom package
// import {
// 	BrowserRouter as Router,
// 	Routes,
// 	Route,
// 	Navigate,
// } from "react-router-dom";

// // import Home component
// import Home from "./Components/navbar";
// // import About component
// import About from "./Components/login";

// function App() {
// 	return (
// 		<>
// 			{/* This is the alias of BrowserRouter i.e. Router */}
// 			<Router>
// 				<Routes>
// 					{/* This route is for home component 
// 		with exact path "/", in component props 
// 		we passes the imported component*/}
// 					<Route
// 						exact
// 						path="/"
// 						element={<Home />}
// 					/>

// 					{/* This route is for about component 
// 		with exact path "/about", in component 
// 		props we passes the imported component*/}
// 					<Route
// 						path="/login"
// 						element={<About />}
// 					/>

// 					{/* If any route mismatches the upper 
// 		route endpoints then, redirect triggers 
// 		and redirects app to home component with to="/" */}
// 					{/* <Redirect to="/" /> */}
// 					<Route
// 						path="*"
// 						element={<Navigate to="/" />}
// 					/>
// 				</Routes>
// 			</Router>
// 		</>
// 	);
// }

// export default App;

