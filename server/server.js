// const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.send('Working');
// });

module.exports = {
  app,
};
