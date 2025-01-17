// Import the `query` function from the db.js file
// This function is used to run SQL queries against the database
import { query } from  "../db.js"

// Define an asynchronous function to get clients from the database
export const getClients = async() => {
      // Run a SQL query to select all rows from the 'clients_tb' table
        // Destructure the 'rows' property from the query result to get the actual data
        const { rows } = await query("SELECT * FROM clients_tb");
     // Return the rows containing the data from the 'clients_tb' table
    return rows;
}

export const createClient = async (clientData) => {
    const { name, email, job, rate, isactive } = clientData;
    const { rows } = await query(
      `INSERT INTO clients_tb (name, email, job, rate, isactive)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, job, rate, isactive]
    );
    return rows[0]; 
  };


  export const updateClient = async (clientId, clientData) => {
    const { name, email, job, rate, isactive } = clientData;
    const { rows } = await query(
      `UPDATE clients_tb SET name = $1, email = $2, job = $3, rate = $4, isactive = $5
       WHERE id = $6 RETURNING *`,
      [name, email, job, rate, isactive, clientId]
    );
    return rows[0]; 
  };

  export const deleteClient = async (clientId) => {
    const { rowCount } = await query(
      `DELETE from clients_tb WHERE id = $1`,  [clientId]);
    return rowCount > 0; //returns true if a row was deleted, false otherwise
  };

  export const searchClient = async (searchTerm) => {
    const { rows } = await query(
      `SELECT * FROM clients_tb WHERE name ILIKE $1 OR email ILIKE $1 OR job ILIKE $1`,
      [`%${searchTerm}%`]);
    return rows;
  };

// Importing the Service Module:

// The clientService module is imported using import * as clientService.
// This means you can access all exported functions from the module as properties of clientService.
// getClients Function:

// This is an Express route handler for fetching clients.
// It handles incoming HTTP requests to a specific route (e.g., /clients).
// Try Block:

// The try block calls clientService.getClients() to get the list of clients from the database.
// Once the data is retrieved, it sends a 200 response with the client data in JSON format using res.status(200).json(clients).
// Catch Block:

// If an error occurs during the operation (e.g., database issues), the catch block:
// Logs the error to the console for debugging.
// Sends a 500 response with a message indicating an internal server error.

// HTTP Response:
// By sending appropriate HTTP status codes (200 for success, 500 for errors), 
// this function follows RESTful API practices.