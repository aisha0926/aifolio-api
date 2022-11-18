import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log('Connected to DB'))
  .catch((err) => console.log(`Error: ${err}`));

import userRoutes from './routes/userRoutes.js';
app.use('/api/user', userRoutes);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
