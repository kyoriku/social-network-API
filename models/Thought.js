const { Schema, model } = require('mongoose'); // Importing necessary modules from the Mongoose package
const reactionSchema = require('./Reaction'); // Importing the reactionSchema
const formatDate = require('../utils/formatDate'); // Importing the formatDate utility function

// Creating a new schema for thoughts
const thoughtSchema = new Schema(
  {
    // Defining the 'thoughtText' field with string type, required, with min and max length constraints
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    // Defining the 'createdAt' field with Date type, defaulting to the current date, and a getter to format the date
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => formatDate(timestamp)
    },
    // Defining the 'username' field with string type, required
    username: {
      type: String,
      required: true
    },
    // Defining the 'reactions' field as an array of subdocuments based on the reactionSchema
    reactions: [reactionSchema]
  },
  // Additional options for the schema
  {
    // toJSON option to include virtual properties, getters, and exclude version key
    toJSON: {
      virtuals: true,
      getters: true,
      versionKey: false // Setting versionKey to false hides the "__v" field
    },
    // Disabling the generation of an id virtual property
    id: false
  }
);

// Defining a virtual property 'reactionCount' to calculate the number of reactions a thought has
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Creating a model 'Thought' based on the defined schema
const Thought = model('Thought', thoughtSchema);

// Exporting the 'Thought' model
module.exports = Thought;
