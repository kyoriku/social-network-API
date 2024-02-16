const { Schema, Types } = require('mongoose'); // Importing necessary modules from the Mongoose package
const formatDate = require('../utils/formatDate'); // Importing the formatDate utility function

// Creating a new schema for reactions
const reactionSchema = new Schema(
  {
    // Defining the 'reactionId' field with ObjectId type, defaulting to a new ObjectId
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    // Defining the 'reactionBody' field with string type, required, with max length constraint
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    // Defining the 'username' field with string type, required
    username: {
      type: String,
      required: true
    },
    // Defining the 'createdAt' field with Date type, defaulting to the current date, and a getter to format the date
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => formatDate(timestamp)
    }
  },
  // Additional options for the schema
  {
    // toJSON option to include getters and exclude version key
    toJSON: {
      getters: true,
      versionKey: false // Setting versionKey to false hides the "__v" field
    },
    // Disabling the generation of an id virtual property
    id: false
  }
);

// Exporting the reactionSchema
module.exports = reactionSchema;
