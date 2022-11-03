require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

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

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
