require('dotenv').config();
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { corsOptions } from './config/corsConfig';
import routerCatergories from './routes/categories';
import postsRouter from './routes/posts';
import { verifyToken } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import auth from './routes/auth';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));

app.use('/api/categories', routerCatergories);
app.use('/api/posts', postsRouter);
app.use('/api/auth', auth);

app.use(verifyToken);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
