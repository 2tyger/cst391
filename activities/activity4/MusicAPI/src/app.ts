import express, { Request, Response } from 'express';
import albumsRouter from './albums/albums.routes';
import artistsRouter from './artists/artists.routes';
import logger from './middleware/logger.middleware';
import cors from 'cors';
import helmet from 'helmet';

import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, '../.env') });


const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;

// parse json bodies
app.use(express.json());

// parse url encoded bodies
app.use(express.urlencoded({ extended: true }));

// enable CORS
app.use(cors());

// adding set of security middleware
app.use(helmet());

console.log(process.env.MY_SQL_DB_HOST);
console.log(process.env.MY_SQL_DB_PORT);
console.log(process.env.MY_SQL_DB_USER);
console.log(process.env.MY_SQL_DB_PASSWORD);
console.log(process.env.MY_SQL_DB_DATABASE);
console.log(process.env.MY_SQL_DB_CONNECTION_LIMIT);

console.log(process.env.PORT);
console.log(process.env.NODE_ENV);
console.log(process.env.GREETING);

if (process.env.NODE_ENV === 'development') {
    // add logger middleware
    app.use(logger);
    console.log(process.env.GREETING + ' in dev mode')
}

// define a route handler for application routes
// root route
app.get('/', (req: Request, res: Response) => {
    // send response back to the browser
    res.send('<h1>Welcome to the Music API!<h1/>');
});

// adding router middleware
app.use('/', [albumsRouter, artistsRouter]);

// start the server and listen on the specified port
app.listen(port, () => {
    // log a message to the console when the server is ready
    console.log(`Example app listening at http://localhost:${port}`)
});