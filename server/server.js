import express from 'express';
import 'dotenv/config';

import userRouter from './routes/user.route.js';
import { errorHandler } from './libs/middleware.js';

const PORT = 8000;
const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
