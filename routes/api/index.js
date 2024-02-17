const router = require('express').Router(); // Importing the Router function from the Express package
const userRoutes = require('./userRoutes'); // Importing userRoutes module, which contains routes related to users
const thoughtRoutes = require('./thoughtRoutes'); // Importing thoughtRoutes module, which contains routes related to thoughts

router.use('/users', userRoutes); // Mounting userRoutes under the '/users' path
router.use('/thoughts', thoughtRoutes); // Mounting thoughtRoutes under the '/thoughts' path

module.exports = router; // Exporting the router
