import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import connectDB from './mongodb/connect.js';

import dalleRoutes from './routes/dalleRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();
app.use(cors({
    origin: '*',
  }));
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/post', postRoutes);

app.get('/', async (rep, res) => {
  res.send('Hello From DALL-E');
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log('Server has started on port http://localhost:8080')
    );
  } catch (error) {
    console.log(err);
  }
};

startServer();
