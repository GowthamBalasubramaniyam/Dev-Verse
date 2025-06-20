const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/auth');

// @route   GET api/auth
// @desc    Get logged in user  
// @access  Private
router.get('/',  (req, res) => res.send('Auth route'));




module.exports = router;