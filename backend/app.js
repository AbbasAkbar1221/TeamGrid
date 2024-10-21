const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json()); // Middleware to parse JSON

// Import routes
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');



// Use routes
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);


// Define a simple route for the home page
app.get('/', (req, res) => {
  res.send('Welcome to TeamGrid API');
});


// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});













