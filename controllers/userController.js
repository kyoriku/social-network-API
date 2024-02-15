const { User, Thought } = require('../models');

const userController = {
  // Method for getting all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();

      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }

      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Method for getting a single user by ID
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Method for creating a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);

      res.status(201).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Method for updating a user by ID
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Method for deleting a user by ID
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Method for adding a friend to a user's friend list
  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Method for removing a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  }
};

module.exports = userController;
