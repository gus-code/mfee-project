import express from 'express';

import auth from './routes/auth';
import categories from './routes/categories';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/categories', categories);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
