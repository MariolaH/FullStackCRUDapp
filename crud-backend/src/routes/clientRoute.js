// Import the Express library, which is used to create a web server and define routes
import express from 'express';

// Import all exports from the "clientController" module as "clientController"
// This allows access to functions like `getClients` from the controller
import * as clientController from '../controllers/clientController.js'

// Create a new router instance using Express
// Routers allow you to define routes in separate modules for better organization
const router = express.Router();

// Define a GET route for the '/clients' endpoint
// When a GET request is made to '/clients', the `getClients` function from the "clientController" module will be executed
router.get('/clients', clientController.getClients);
router.post('/clients', clientController.createClient);
router.put('/clients/:id', clientController.updateClient);
router.delete('/clients/:id', clientController.deleteClient);
router.get('/clients/search', clientController.searchClient);




// Export the router to be used in other parts of the application (e.g., to integrate into the main Express app)
export default router;


// Importing Express:

// The express module is used to create a router instance (express.Router()), which organizes the application's endpoints.
// Importing the Controller:

// The clientController module is imported, allowing access to its exported functions (like getClients).
// clientController.getClients is a function that handles the logic for fetching client data and returning a response.
// Creating a Router:

// The express.Router() instance (router) acts as a mini-application to group related routes (e.g., all client-related routes).
// This makes the app more modular and easier to maintain.
// Defining a Route:

// The router.get('/clients', clientController.getClients) line sets up a route for handling GET requests to the /clients endpoint.
// When a GET request is made to /clients, Express will call the getClients function from the clientController module.
// Exporting the Router:

// export default router makes this router available to other parts of the app.
// For example, it might be imported into the main app file (e.g., app.js) and added to the main Express application.