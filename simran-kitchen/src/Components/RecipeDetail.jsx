import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ flex: '1' }}>
                <h1>{recipe.title}</h1>
                <p>{recipe.ingredients}</p>
                <p>{recipe.instructions}</p>
            </div>
            {recipe.imageUrl && (
                <img 
                    src={`http://localhost:5000${recipe.imageUrl}`} 
                    alt={recipe.title} 
                    style={{
                        maxWidth: '100%', /* Ensures image resizes within parent */
                        height: '100%', /* Ensures image aspect ratio is maintained */
                        borderRadius: '40px', /* Rounded corners */
                        objectFit: 'cover' /* Ensures image covers its container */
                    }} 
                />
            )}
        </div>
    );
};

export default RecipeDetail;
