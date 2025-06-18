const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoDBURI');

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true
        });
        console.log("MongoDB connection Successful");
    }catch(err){
        console.log("MongoDB connection Unsuccessful");
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;
// This code connects to a MongoDB database using Mongoose.