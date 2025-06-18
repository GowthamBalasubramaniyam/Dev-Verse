const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('User route is working');
});

module.exports = router;
// This code defines a simple Express router for user-related routes.