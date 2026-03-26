import express from 'express';
import cors from 'cors';
import prayerRequestRoutes from './routes/prayerRequestRoutes';

// create express app
const app = express();

// enable CORS for all routes
app.use(cors());

// allow json request bodies
app.use(express.json());

// register routes under /api
app.use('/api', prayerRequestRoutes);

export default app;