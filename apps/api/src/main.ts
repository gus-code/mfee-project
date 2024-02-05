import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

import { corsOptions } from './config/corsConfig';

import auth from './routes/auth';
import categories from './routes/categories';
import posts from './routes/posts';

import authMiddleware from './middleware/auth';
import errorHandlerMiddleware from './middleware/errorHandler';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors(corsOptions));

server.use('/api/auth', auth);
server.use('/', authMiddleware);
server.use('/api/categories', categories);
server.use('/api/posts', posts);
server.use(errorHandlerMiddleware);

mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log('Connected to MongoDB');
  server.listen(port, host, () => {
    console.log(`Express Server started... [ ready ] http://${host}:${port}`);
  });
}).catch((e)=>{
  console.log(e);
});

