const router = require('express').Router(); // Importing the Router function from the Express package
const apiRoutes = require('./api'); // Importing the apiRoutes module, which contains routes for the API

router.use('/api', apiRoutes); // Mounting the apiRoutes under the '/api' path

// Setting up a middleware function to handle requests that don't match any routes
router.use((req, res) => {
  // Sending a 404 response with the message 'Not found'
  return res.status(404).send('Not found');
});

module.exports = router; // Exporting the router
