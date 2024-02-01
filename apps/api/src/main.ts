import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { corsOptions } from './config/corsConfig';

import categories from './routes/categories';
import posts from './routes/posts';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));

app.use('/api/categories', categories);
app.use('/api/posts', posts);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
