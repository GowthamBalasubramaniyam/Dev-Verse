const express = require('express');
const router = express.Router();
const authentication = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

// @route   GET api/auth
// @desc    Get logged in user  
// @access  Private
router.get('/',  authentication, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post('/',[
  check('email','Email is required').isEmail(),
  check('password','Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json(({errors: errors.array()})); 
  }

  const {email, password} = req.body;

  try{
      //Check if User Exists
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
    }
    //Check Password
    const isMatch = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password
    if(!isMatch){
        return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
    }

  //Return jsonwebtoken
  const payload = {
    user : {
      id: user.id // Use user.id to get the MongoDB ObjectId
    }
  }
  jwt.sign(
    payload,
    config.get('JWTSecret'), // Get the JWT secret from the config
    {expiresIn: "1d"}, // Token expiration time
    (err, token) => {
      if(err) throw err;
      res.json({token}); // Send the token in the response
    }
  );

  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }

});




module.exports = router;