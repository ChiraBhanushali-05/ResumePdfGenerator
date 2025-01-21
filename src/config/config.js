const dotenv = require("dotenv");

dotenv.config();

const config = {
  mongoURI: process.env.MONGO_URI,  
  port: process.env.PORT || 5000,   
};

module.exports = config;
