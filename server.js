const express = require('express');
const connectDb = require('./config/db');
const userRoutes = require('./routes/api/users'); 
const path = require('path'); 


const app = express();

connectDb(); // Connect to the database


app.use(express.json({ extended: false })); // Middleware to parse JSON bodies


app.use('/api/users', userRoutes); // Use the user routes defined in users.js
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// Define the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});