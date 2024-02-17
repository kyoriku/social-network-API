// Importing the Router function from the Express package
const router = require('express').Router();

// Importing controller functions from the thoughtController module
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// Defining routes for handling requests related to thoughts

// Route: /api/thoughts
router
  .route('/')
  .get(getAllThoughts) // GET request handler to get all thoughts
  .post(createThought); // POST request handler to create a new thought

// Route: /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById) // GET request handler to get a thought by ID
  .put(updateThought) // PUT request handler to update a thought by ID
  .delete(deleteThought); // DELETE request handler to delete a thought by ID

// Route: /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction); // POST request handler to add a reaction to a thought

// Route: /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction); // DELETE request handler to remove a reaction from a thought

// Exporting the router to be used in other modules
module.exports = router;
