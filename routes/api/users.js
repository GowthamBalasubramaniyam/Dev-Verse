const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');


router.post('/',[
  check('name','Name is required').not().isEmpty(),
  check('email','Email is required').isEmail(),
  check('password','Password must be at least 6 characters').isLength({min: 6})
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json(({errors: errors.array()})); 
  }

  const {name, email, password} = req.body;

  try{
      //Check if User Already Exists
    let user = await User.findOne({email});
    if(user){
      return res.status(400).json({errors: [{msg: 'User already exists'}]});
    }
    //Generate Avatar from Gravatar
    const avatar = gravatar.url(email, {
      s: '200', // Size of the avatar
      r: 'pg', // Rating
      d: 'mm' // Default image if no gravatar is found
    })

    //Create New User Object
    user = new User({
      name,
      email,
      avatar,
      password
    });
    
    //Hash the Password with Bcrypt
    const salt = await bcrypt.genSalt(10); // Generate a salt for hashing (salt is a random string)
    user.password = await bcrypt.hash(password, salt); // Hash the password
    await user.save(); // Save the user to the database

  //Return jsonwebtoken
  const payload = {
    user : {
      id: user.id // Use user.id to get the MongoDB ObjectId
    }
  }
  jwt.sign(
    payload,
    config.get('JWTSecret'), // Get the JWT secret from the config
    {expiresIn: 360000}, // Token expiration time
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
