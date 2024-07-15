import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    // navigate('/add-recipe');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);
    if (image) {
      formData.append('image', image);
    }

    await axios.post('http://localhost:5000/api/add-recipe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    navigate('/admin'); // Redirect to the recipe list after adding
  };

  return (
    <Box p={3}>
      <h2>Add Recipe</h2>
      <form onSubmit={handleAddRecipe}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br></br>
        <textarea
          placeholder="Ingredients"
          label="Ingredients"
          fullWidth
          rows={5}
          // cols={40}
          margin="normal"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <br></br>
        <textarea 
          placeholder="Instructions"
          fullWidth
          rows={5}
          cols={40}
          margin="normal"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <br></br>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
      </form>
    </Box>
  );
};

export default AddRecipe;
