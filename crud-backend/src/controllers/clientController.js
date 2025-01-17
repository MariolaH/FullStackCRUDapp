// Import all exports from the "clientServices" module as "clientService"
// This allows access to functions defined in the "clientServices" module, such as `getClients`
import * as clientService from "../services/clientServices.js"

// Define an asynchronous function to handle the HTTP request for fetching clients
export const getClients = async (req, res) => {
    try {
           // Call the `getClients` function from the "clientServices" module
        // This function retrieves a list of clients from the database
        const clients = await clientService.getClients();
        // Send a 200 (OK) HTTP status and the list of clients as a JSON response
        res.status(200).json(clients);
    } catch (err) {
        // Log the error to the console for debugging
        console.error('Error fetching clients: ', err);
        // Send a 500 (Internal Server Error) HTTP status with a JSON error message
        res.status(500).json({ message: 'Internal Server Error'});
    }
};

export const createClient = async (req, res) => {
    try {
        const clientData = req.body;
        const newClient = await clientService.createClient(clientData);
        res.status(200).json(newClient);
    } catch (err) {
        console.error('Error adding clients: ',err);
        res.status(500).json({ message: 'Internal Server Error'});
    }
};

export const updateClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const clientData = req.body;
        const updateClient = await clientService.updateClient(clientId, clientData);
        if (!updateClient) {
            return res.status(400).json({ message: 'Client not found' })
        }
        res.status(200).json(updateClient);
    } catch (err) {
        console.error('Error updating clients: ', err);
        res.status(500).json({ message: 'Internal Server Error'});
    }
};


export const deleteClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const deleted = await clientService.deleteClient(clientId);
        if (!deleted) {
            return res.status(404).json({ message: 'Client not found' })
        }
        res.status(200).send();
        
    } catch (err) {
        console.error('Error deleting clients: ', err);
        res.status(500).json({ message: 'Internal Server Error'});
    }
};

export const searchClient = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const clients = await clientService.searchClient(searchTerm);
        res.status(200).json(clients);
        
    } catch (err) {
        console.error('Error searching clients: ', err);
        res.status(500).json({ message: 'Internal Server Error'});
    }
};
