const jwt =  require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    //get the token from the header
    const token = req.header('x-auth-token');

    //check if the token exists
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'});
    }
    //verify the token
    try{
        const decoded = jwt.verify(token, config.get('JWTSecret'));
        req.user = decoded.user; // Attach the user information to the request object
        next(); // Call the next middleware or route handler
    }catch(err){
        console.error(err.message);
        return res.status(403).json({msg: 'Token is not valid'});
    }
}
