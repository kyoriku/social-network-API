// Importing the Router function from the Express package
const router = require('express').Router();

// Importing controller functions from the userController module
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// Defining routes for handling requests related to users

// Route: /api/users
router
  .route('/')
  .get(getAllUsers) // GET request handler to get all users
  .post(createUser); // POST request handler to create a new user

// Route: /api/users/:userId
router
  .route('/:userId')
  .get(getUserById) // GET request handler to get a user by ID
  .put(updateUser) // PUT request handler to update a user by ID
  .delete(deleteUser); // DELETE request handler to delete a user by ID

// Route: /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(addFriend) // POST request handler to add a friend to a user
  .delete(removeFriend); // DELETE request handler to remove a friend from a user

// Exporting the router to be used in other modules
module.exports = router;
