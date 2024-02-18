// Importing the Thought and User models from the models directory
const { Thought, User } = require('../models');

// Defining an object containing various controller methods for handling thought-related operations
const thoughtController = {
  // Method for getting all thoughts
  async getAllThoughts(req, res) {
    try {
      // Finding all thoughts in the database
      const thoughts = await Thought.find();

      // Checking if there are thoughts in the database
      if (thoughts.length === 0) {
        return res.status(404).json({ message: 'No thoughts found' });
      }

      // Sending the retrieved thoughts as a JSON response
      res.json(thoughts);
    } catch (err) {
      // Handling any errors that occur and sending a 500 status code along with the error message
      res.status(500).json(err);
    }
  },

  // Method for getting a single thought by ID
  async getThoughtById(req, res) {
    try {
      // Finding a thought by its ID
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      // Checking if thought exists
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      // Sending the retrieved thought as a JSON response
      res.json(thought);
    } catch (err) {
      // Handling any errors that occur and sending a 500 status code along with the error message
      res.status(500).json(err);
    }
  },

  // Method for creating a new thought
  async createThought(req, res) {
    try {
      // Finding the user who is creating the thought
      const user = await User.findOne({ _id: req.body.userId });

      // Checking if the user exists
      if (!user) {
        return res.status(400).json({ message: 'Invalid userId provided' });
      }

      // Creating a new thought with the data provided in the request body
      const thought = await Thought.create(req.body);

      // Updating the users thoughts array to include the newly created thought
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      // Sending a 201 status code along with the created thought as a JSON response
      res.status(201).json(thought);
    } catch (err) {
      // Handling any errors that occur, logging them, and sending a 500 status code along with the error message
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Method for updating a thought by ID
  async updateThought(req, res) {
    try {
      // Updating a thought by its ID with the data provided in the request body
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      // Checking if thought exists
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      // Sending the updated thought as a JSON response
      res.json(thought);
    } catch (err) {
      // Handling any errors that occur, logging them, and sending a 500 status code along with the error message
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Method for deleting a thought by ID
  async deleteThought(req, res) {
    try {
      // Deleting a thought by its ID
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      // Checking if thought exists
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      // Finding and updating the user who has the deleted thought in their thoughts array
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      // Checking if the associated user exists
      if (!user) {
        return res.status(404).json({ message: 'Thought deleted, but no user found with associated thought ID' });
      }

      // Sending a JSON response confirming the deletion
      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      // Handling any errors that occur and sending a 500 status code along with the error message
      res.status(500).json(err);
    }
  },

  // Method for adding a reaction to a thought
  async addReaction(req, res) {
    try {
      // Adding a reaction to a thought by its ID
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      // Checking if thought exists
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      // Sending the updated thought as a JSON response
      res.json(thought);
    } catch (err) {
      // Handling any errors that occur, logging them, and sending a 500 status code along with the error message
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Method for removing a reaction from a thought
  async removeReaction(req, res) {
    try {
      // Removing a reaction from a thought by its ID
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      // Checking if thought exists
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      // Sending the updated thought as a JSON response
      res.json(thought);
    } catch (err) {
      // Handling any errors that occur and sending a 500 status code along with the error message
      res.status(500).json(err);
    }
  }
};

// Exporting the thoughtController object to be used in other modules
module.exports = thoughtController;
