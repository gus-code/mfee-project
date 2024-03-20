import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { corsOptions } from './config/corsConfig';
import { verifyToken } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import auth from './routes/auth';
import categories from './routes/categories';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));

app.use('/api/auth', auth);

app.use(verifyToken);
app.use('/api/categories', categories);

app.use(errorHandler);

export default app;