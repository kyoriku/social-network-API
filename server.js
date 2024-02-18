// Importing the express module
const express = require('express');

// Importing the database connection from the config directory
const db = require('./config/connection');

// Importing the routes from the routes directory
const routes = require('./routes');

// Defining the port number to listen on, using the environment variable PORT if available, otherwise defaulting to 3001
const PORT = process.env.PORT || 3001;

// Creating an instance of the Express application
const app = express();

// Middleware to parse incoming request bodies with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// Middleware to parse incoming request bodies with JSON payloads
app.use(express.json());

// Mounting the routes onto the application
app.use(routes);

// Establishing a connection to the database, and once the connection is open, starting the Express server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
