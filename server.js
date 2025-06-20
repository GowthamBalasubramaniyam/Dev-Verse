const express = require('express');
const connectDb = require('./config/db');
const userRoutes = require('./routes/api/users'); 

const app = express();

connectDb(); // Connect to the database

app.use(express.json({ extended: false })); // Middleware to parse JSON bodies

// app.post('/', (req, res) => {
//   console.log(req.body); 
//   res.send('User registeration route is working');
// });

app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users',userRoutes); // Use the user routes defined in users.js

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});