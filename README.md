# Social Network API
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Built With
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.JS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en)
[![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![.ENV](https://img.shields.io/badge/.ENV-ECD53F.svg?style=for-the-badge&logo=dotenv&logoColor=black)](https://www.npmjs.com/package/dotenv)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248.svg?style=for-the-badge&logo=MongoDB&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000.svg?style=for-the-badge&logo=Mongoose&logoColor=white)](https://mongoosejs.com/)
[![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE)](https://insomnia.rest/download/)

## Description
The Social Network API is a backend system designed to power a social networking web application. It enables users to share their thoughts, react to friends' thoughts, and manage a friend list. Built using [Express.js](https://expressjs.com/) for routing, [MongoDB](https://www.mongodb.com/) for data storage, and [Mongoose](https://mongoosejs.com/) as the ODM, this API is optimized for handling large amounts of unstructured data efficiently. Whether you're developing a new social media platform or learning about backend development, this API provides a solid foundation for building and structuring social networking applications.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Walkthrough Video](#walkthrough-video)
- [Credits](#credits)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation
1. Clone the repository to your local machine.
    ```bash
    git clone https://github.com/kyoriku/social-network-api.git
    ```
2. Navigate to the project directory.
    ```bash
    cd social-network-api
    ```
3. Create a `.env` file in the root directory and add the following variable, replacing `your_mongodb_connection_string` with your actual MongoDB connection string (example: 'mongodb://127.0.0.1:27017/SocialNetworkDB').
    ``` bash
    MONGODB_URI='your_mongodb_connection_string'
    ```
4. Install the required dependencies.
    ```bash
    npm install
    ```

## Usage
1. Confirm [MongoDB](https://www.mongodb.com/) is installed and running on your local machine.
2. Start the server.
    ``` bash
    npm start
    ```
3. Use a tool like [Insomnia](https://insomnia.rest/download) or [Postman](https://www.postman.com/downloads/) to test the API routes. Here are the available routes:
   - **Users**
     - GET `/api/users`: Get all users
     - GET `/api/users/:userId`: Get a single user by id
     - POST `/api/users`: Create a new user
     - PUT `/api/users/:userId`: Update a user by id
     - DELETE `/api/users/:userId`: Delete a user by id, and remove the users associated thoughts when deleted. Also, remove the deleted user from other users friend lists.

   - **Thoughts**
     - GET `/api/thoughts`: Get all thoughts
     - GET `/api/thoughts/:thoughtId`: Get a single thought by id
     - POST `/api/thoughts`: Create a new thought
     - PUT `/api/thoughts/:thoughtId`: Update a thought by id
     - DELETE `/api/thoughts/:thoughtId`: Delete a thought by id

   - **Friends**
     - POST `/api/users/:userId/friends/:friendId`: Add a friend to a users friend list
     - DELETE `/api/users/:userId/friends/:friendId`: Remove a friend from a users friend list

   - **Reactions**
     - POST `/api/thoughts/:thoughtId/reactions`: Create a reaction for a specific thought
     - DELETE `/api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction from a thought by its id

   These routes have been thoroughly tested to verify their functionality. Remember to configure your environment variables and database connections appropriately before running the API.

## Walkthrough Video
[Link to walkthrough video](https://drive.google.com/file/d/1l_36mtZ3UfuhjGEd1akKxOmcfXskJke6/view?usp=sharing)

https://github.com/kyoriku/social-network-api/assets/145511725/55ec128d-a5b1-4f60-924e-b579e9f7670e

## Credits
- [How to Validate Unique Emails with Mongoose](https://masteringjs.io/tutorials/mongoose/mongoose-validate-unique-email)
- [Mongoose ODM: Hide "__v" property](https://stackoverflow.com/questions/13699784/mongoose-v-property-hide)

## License
This application is covered by the [MIT](https://opensource.org/licenses/MIT) license.

## Contributing
If you want to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your branch.
5. Submit a pull request, explaining your changes.

## Questions
If you have any questions, please contact [kyoriku](https://github.com/kyoriku) or email devkyoriku@gmail.com.
