import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

import { corsOptions } from './config/corsConfig';
import { verifyToken } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import auth from './routes/auth';
import categories from './routes/categories';
import posts from './routes/posts';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));

app.use('/api/auth', auth);

app.use(verifyToken);
app.use('/api/categories', categories);
app.use('/api/posts', posts);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(port, host, () => {
      console.log(`Express Server started...  [ ready ] http://${host}:${port}`);
    });
  })
  .catch((e) => {
    console.error(e);
  });

  mongoose.connection.on('error', (err) => {
    console.log(`DB connection runtime error`);
    console.log(err);
  });