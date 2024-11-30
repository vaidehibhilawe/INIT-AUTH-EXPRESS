const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // For serving static files
const authRoutes = require('./routes/auth'); // Import routes for authentication

dotenv.config(); // Initialize dotenv for environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes for authentication
app.use('/api/auth', authRoutes); // Authentication routes (login, signup)

// Serve the login page when accessing /login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html')); // Serve login.html from the 'public' folder
});

// Serve the signup page when accessing /signup
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html')); // Serve signup.html from the 'public' folder
});

// Default route (Just a message)
app.get('/', (req, res) => {
  res.send('Welcome to the API! Visit /login or /signup to access the pages.');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
