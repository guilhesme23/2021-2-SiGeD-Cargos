const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('API ROLES!!!');
});

app.listen(3005);
