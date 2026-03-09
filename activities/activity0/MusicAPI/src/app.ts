import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// define a route handler for default page (i.e. root URL "/")
// when a user visits localhost:3000/, this function will be called
app.get('/', (req: Request, res: Response) => {
    // send response back to the browser
    res.send('Hello World from TypeScript!');
});

// start the server and listen on the specified port
app.listen(port, () => {
    // log a message to the console when the server is ready
    console.log(`Example app listening at http://localhost:${port}`)
});