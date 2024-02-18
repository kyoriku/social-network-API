// Load environment variables from a .env file into process.env
require('dotenv').config();

// Destructure the 'connect' and 'connection' objects from the 'mongoose' module
const { connect, connection } = require('mongoose');

// Define the MongoDB connection string, using the value of MONGODB_URI environment variable if available, otherwise default to a local MongoDB instance
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/SocialNetworkDB';

// Establish a connection to the MongoDB database using the connection string
connect(connectionString);

// Export the 'connection' object for external use, which represents the current connection to the MongoDB database
module.exports = connection;
