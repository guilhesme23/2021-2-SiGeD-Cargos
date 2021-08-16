const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_HOST,
  DB_PORT,
} = process.env;

const url = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?authSource=admin`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err) => {
    console.log('Error on connecting to MongoDB', err);
  });

const app = express();

app.get('/', (req, res) => {
  res.send('API ROLES!!!');
});

app.listen(DB_PORT);
