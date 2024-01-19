import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { corsOptions } from './config/corsConfig';

import categories from './routes/categories';
import posts from './routes/posts';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors(corsOptions));

server.use('/api/categories', categories);
server.use('/api/posts', posts);

server.listen(port, host, () => {
  console.log(`Express Server started... [ ready ] http://${host}:${port}`);
});
