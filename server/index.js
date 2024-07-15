import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import { log } from 'console';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
// Static folder for serving images
app.use('/uploads', express.static('uploads'));

const mongoURI = `mongodb+srv://admin:simranskitchen@cluster0.qtmbtyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a simple User schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Define Recipe schema
const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    imageUrl: { type: String }  // Add imageUrl field
});

const Recipe = mongoose.model('Recipe', recipeSchema);

const feedbackSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    rating: Number,
    feedback: String,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

//API route for registration
app.post('/api/register', async (req, res) => {
    const { firstName, lastName, username, password } = req.body;

    try {
        // Check if user already exists
        
        let user = await User.findOne({ "username":username });
        
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({ firstName, lastName, username, password: hashedPassword });
        await user.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to register user' });
    }
});
// API route for login
app.post('/api/login', async (req, res) => {

    
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful ' + username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed' });
    }
});

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });
// console.log(upload,storage);

// API route to get all recipes
app.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recipes' });
    }
});
// API route to add a new recipe
app.post('/api/add-recipe', upload.single('image'), async (req, res) => {
    const { title, ingredients, instructions } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
console.log(imageUrl);
    try {
        const newRecipe = new Recipe({ title, ingredients, instructions, imageUrl });
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add recipe' });
    }
});

// Route to get a specific recipe by ID
app.get('/api/recipes/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).send({ message: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});
// API route to get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

// API route to delete a user
app.delete('/api/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

// API route to update a user (optional, if you want edit functionality)
app.put('/api/users/:id', async (req, res) => {
    const { firstName, lastName, username, password } = req.body;
    
    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        const updatedUser = {
            firstName,
            lastName,
            username,
            ...(password && { password: hashedPassword }),
        };

        const user = await User.findByIdAndUpdate(req.params.id, updatedUser, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user' });
    }
});

app.post('/api/save-recipe/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        const userId = req.user.id; // Assume user is authenticated and their ID is available in req.user
        // Logic to save the recipe for the user (e.g., add to user's saved recipes list)
        res.json({ message: 'Recipe saved successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving recipe' });
    }
});
// Route to submit feedback
app.post('/api/feedback', async (req, res) => {
    const { name, phoneNumber, rating, feedback } = req.body;
    try {
        const newFeedback = new Feedback({ name, phoneNumber, rating, feedback });
        await newFeedback.save();
        res.status(201).send('Feedback submitted successfully');
    } catch (error) {
        res.status(500).send('Error submitting feedback');
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
