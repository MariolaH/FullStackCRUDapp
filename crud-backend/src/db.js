import pg from "pg"
import env from "dotenv"

const db = new pgClient({
    //process.env imports the contents of the .env file into the db.js
    //This explicitly loads the environment variables from the .env file into process.env. Without this, process.env.PG_USER, etc., will be undefined unless the variables are set in the environment some other way.
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  db.connect();

  db.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });

  export const query = (text, params) =>db.query(text, params);