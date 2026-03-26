import dotenv from 'dotenv';
import app from './app';

// load environment variables
dotenv.config();

// get port from env or default to 3000 (its set as 3000 in .env but this is a fallback)
const PORT = process.env.PORT || 3000;

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});