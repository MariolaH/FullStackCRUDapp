// Import the Express library to create and manage the web server
import express from 'express';
// Import the CORS (Cross-Origin Resource Sharing) library to enable secure cross-origin requests
import cors from 'cors';
// Import the clientRoutes module, which defines routes for handling client-related requests
import clientRoutes from './routes/clientRoute.js'

// Create an instance of an Express application
const app = express();
// Define the port number the server will listen on
const port = 3005;

// Use the CORS middleware to enable cross-origin resource sharing
// This allows the server to accept requests from other origins (e.g., frontend running on a different domain or port)
app.use(cors());
// Use the JSON middleware to parse incoming requests with JSON payloads
// It makes the request body available as `req.body` in route handlers
app.use(express.json());

//Output a json file
// Mount the clientRoutes module at the '/api' path
// Any routes defined in `clientRoutes` will now be accessible under '/api' (e.g., '/api/clients')
app.use('/api', clientRoutes);

// Start the server and listen for incoming connections on the specified port
app.listen(port, () => {
        // Log a message to the console indicating the server is running and its URL
    console.log(
        `Server is running on http://localhost:${port}`
    )
});


// Express Setup:

// express is used to create the app object, which represents your web server.
// CORS Middleware:

// The cors() middleware allows your API to handle requests from different origins (e.g., a frontend hosted on another domain or port).
// Without this, browsers might block such requests for security reasons.
// JSON Middleware:

// express.json() parses incoming requests with JSON payloads so that you can access data in the request body using req.body.
// Routing with clientRoutes:

// The clientRoutes module is mounted at the /api path. This means that all routes defined in clientRoutes (like /clients) will be accessible under /api (e.g., /api/clients).
// Starting the Server:

// app.listen(port, ...) starts the server and makes it listen for incoming connections on the specified port (in this case, 3005).
// The callback function logs a message to the console with the URL where the server can be accessed.
