import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const response = await axios.get('http://localhost:5000/api/recipes');
    setRecipes(response.data);
  };

  return (
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
  );
};

export default Recipe;
