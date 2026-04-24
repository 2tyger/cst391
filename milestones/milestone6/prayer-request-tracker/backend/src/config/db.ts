import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// load environment variables from .env file
dotenv.config();

// create a connection pool to the mysql database
const pool = mysql.createPool({
  host: process.env.DB_HOST, // database host (localhost for this one)
  user: process.env.DB_USER, // database username
  password: process.env.DB_PASSWORD, // database password
  database: process.env.DB_NAME, // database name
  port: Number(process.env.DB_PORT), // database port
});

export default pool;