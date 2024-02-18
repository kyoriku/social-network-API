// Importing the User and Thought models from the models directory
const { User, Thought } = require('../models');

// Defining an object containing various controller methods for handling user-related operations
const userController = {
  // Method for getting all users
  async getAllUsers(req, res) {
    try {
      // Finding all users in the database
      const users = await User.find();

      // Checking if there are users in the database
      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }

      // Sending the retrieved users as a JSON response
      res.json(users);
    } catch (error) {
      // Handling any errors that occur and sending a 500 status code along with the error message
      res.status(500).json(error);
    }
  },

  // Method for getting a single user by ID
  async getUserById(req, res) {
    try {
      // Finding a user by their ID and populating their 'thoughts' and 'friends' fields
      const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends');

      // Checking if user exists
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      // Sending the retrieved user as a JSON response
      res.json(user);
    } catch (error) {
      // Handling any errors that occur and sending a 500 status code along with the error message
      res.status(500).json(error);
    }
  },

  // Method for creating a new user
  async createUser(req, res) {
    try {
      // Creating a new user with the data provided in the request body
      const user = await User.create(req.body);

      // Sending a 201 status code along with the created user as a JSON response
      res.status(201).json(user);
    } catch (error) {
      // Handling any errors that occur during user creation and sending a 400 status code along with the error message
      res.status(400).json(error);
    }
  },

  // Method for updating a user by ID
  async updateUser(req, res) {
    try {
      // Updating a user by their ID with the data provided in the request body
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      // Checking if user exists
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      // Sending the updated user as a JSON response
      res.json(user);
    } catch (error) {
      // Handling any errors that occur during user update and sending a 400 status code along with the error message
      res.status(400).json(error);
    }
  },

  // Method for deleting a user by ID
  async deleteUser(req, res) {
    try {
      // Finding and deleting a user by their ID
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      // Checking if user exists
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      // Updating other users' friend lists to remove the deleted user
      await User.updateMany(
        { friends: req.params.userId }, // Finding users who have the deleted user as a friend
        { $pull: { friends: req.params.userId } } // Removing the deleted user from their friend list
      );

      // Deleting all thoughts associated with the deleted user
      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      // Sending a JSON response confirming the deletion
      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (error) {
      // Handling any errors that occur during user deletion and sending a 400 status code along with the error message
      res.status(400).json(error);
    }
  },

  // Method for adding a friend to a users friend list
  async addFriend(req, res) {
    try {
      // Adding a friend to a users 'friends' array by their ID
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      // Checking if user exists
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      // Sending the updated user as a JSON response
      res.json(user);
    } catch (error) {
      // Handling any errors that occur during friend addition and sending a 400 status code along with the error message
      res.status(400).json(error);
    }
  },

  // Method for removing a friend from a users friend list
  async removeFriend(req, res) {
    try {
      // Removing a friend from a users 'friends' array by their ID
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      // Checking if user exists
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      // Sending the updated user as a JSON response
      res.json(user);
    } catch (error) {
      // Handling any errors that occur during friend removal and sending a 400 status code along with the error message
      res.status(400).json(error);
    }
  }
};

// Exporting the userController object to be used in other modules
module.exports = userController;
