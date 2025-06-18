const express = require('express');
const connectDb = require('./config/db')

const app = express();

connectDb(); // Connect to the database

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});