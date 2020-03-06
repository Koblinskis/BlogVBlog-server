
[Play Blog V Blog here!](https://competent-thompson-123cfb.netlify.com/)

Related repos: [Client](https://github.com/Koblinskis/BlogVBlog-client), [Server](https://github.com/Koblinskis/BlogVBlog-server), [MongoDB](https://github.com/Koblinskis/BlogVBlog-mongo)

# Blog V Blog Server

Blog V Blog is a web application that pits two blog titles against each other and the winner is determined by the user. The client is a React application that talks to an ExpressJS API backend, and the server reads and writes to a MongoDB Database. The server selects two random blogs titles from the database and returns them to the client, and then the user picks their favorite. The server records a winning score for the title selected. The highest scoring titles per category can be viewed on the winners page.

  

![Screenshot](https://raw.githubusercontent.com/Koblinskis/BlogVBlog-mongo/master/screenshot.png)

  
This application is a NodeJS Express API server that connects to a MongoDB Database. That connection allows for reading and writing to documents and enables this server to be stateless and easily, horizontally scaleable. To learn more about how MongoDB is used in this project [click here](https://github.com/Koblinskis/BlogVBlog-mongo). The server provides endpoints for a client to make HTTP requests to. This server follows an MVC structure (without the V) and leverages Mongoose for an ORM. 

This is deployed on Heroku.

## How to run the server
Create a `.env.development` file at the root of the project. That file needs to contain the following (assuming you are running MongoDB locally and have followed adding the data to your database from [here](https://github.com/Koblinskis/BlogVBlog-mongo)):
```
REACT_APP_MONGODB_URL="mongodb://127.0.0.1:27017/blog-data"
```
**Steps to run**:

 1. `npm install`
 2. `npm run server`
