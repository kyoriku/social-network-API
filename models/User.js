const { Schema, model } = require('mongoose'); // Importing necessary modules from the Mongoose package

// Creating a new schema for the user
const userSchema = new Schema(
  {
    // Defining the 'username' field with string type, unique, required, and trim properties
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    // Defining the 'email' field with string type, required, unique, and match properties for email validation
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match a valid email address']
    },
    // Defining the 'thoughts' field as an array of ObjectIds, referencing the 'Thought' model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    // Defining the 'friends' field as an array of ObjectIds, referencing the 'User' model
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
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
    id: false,
  }
);

// Defining a virtual property 'friendCount' to calculate the number of friends a user has
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Creating a model 'User' based on the defined schema
const User = model('User', userSchema);

// Exporting the 'User' model
module.exports = User;
