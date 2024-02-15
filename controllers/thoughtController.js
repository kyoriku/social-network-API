const { Thought, User } = require('../models');

const thoughtController = {
  // Method for getting all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      if (thoughts.length === 0) {
        return res.status(404).json({ message: 'No thoughts found' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Method for getting a single thought by ID
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const user = await User.findById(req.body.userId);

      if (!user) {
        return res.status(400).json({ message: 'Invalid userId provided' });
      }
  
      const thought = await Thought.create(req.body);

      await User.findByIdAndUpdate(
        req.body.userId,
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
  
      res.status(201).json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this ID!' });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
