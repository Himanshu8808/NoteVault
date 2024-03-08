const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.dbURL;

const connectToMongo = ()=>{
    mongoose.connect(mongoURI);
}
module.exports = connectToMongo;