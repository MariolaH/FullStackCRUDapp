
// Import the PostgreSQL client library (pg) and dotenv for environment variable management
import pg from "pg";
import env from "dotenv";

// Load environment variables from the .env file into process.env
env.config();

// Destructure the `Client` class from the pg library
const db = new pg.Client({
  //process.env imports the contents of the .env file into the db.js
  //This explicitly loads the environment variables from the .env file into process.env. Without this, process.env.PG_USER, etc., will be undefined unless the variables are set in the environment some other way.
  // Create a new PostgreSQL client instance using environment variables for configuration
  user: process.env.PG_USER, // The database username from .env
  host: process.env.PG_HOST, // The database host address from .env
  database: process.env.PG_DATABASE, // The database name from .env
  password: process.env.PG_PASSWORD, // The database password from .env
  port: process.env.PG_PORT, // The database port number from .env
});
//connects to the database
// Connect the client to the database
db.connect();

//error handling
// Attach an error event listener to handle unexpected errors
// If an error occurs, log it to the console and exit the process
db.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// is creating a reusable function called query and exporting it so it can be used in other parts of your application.
//creates a shortcut function called query that runs a database query
// text: You give it a SQL command (like "SELECT * FROM users WHERE id = $1").
// params: You give it a list of values to replace placeholders (like $1) in your SQL.
//Then, it sends the command and values to your database to get the result.
// By writing export, it lets you use this query function in other files of your project. So, instead of always writing the database query logic everywhere, you just call query() to make it easier and cleaner.
export const query = (text, params) => db.query(text, params);
