// Main entry point for the backend API
// Sets up Express app, middleware, routes, and error handling
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { corsOptions } from './config/corsConfig';
import { verifyToken } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import auth from './routes/auth';
import categories from './routes/categories';
import posts from './routes/posts';

dotenv.config(); // Load environment variables from .env

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();

// Global middlewares
app.use(express.json()); // Parse JSON bodies
app.use(helmet()); // Security headers
app.use(cors(corsOptions)); // CORS config
app.use(cookieParser()); // Parse cookies

// Public routes (no auth required)
app.use('/api/auth', auth);

// Protected routes (require JWT)
app.use(verifyToken);
app.use('/api/categories', categories);
app.use('/api/posts', posts);

// Error handler (always last)
app.use(errorHandler);

// Start server
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
