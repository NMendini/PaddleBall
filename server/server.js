/* eslint-disable no-console */
// const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const db = require('../database/mariadb.js');

const app = express();
app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/api/hiscores', (req, res) => {
  db.getScores((err, data) => {
    if (err) {
      console.error(err);
      res.setStatus(404).send(err);
    } else {
      res.send(data);
    }
  });
});

app.post('/api/hiscores', (req, res) => {
  console.log(req.body);
  db.postScore(req.body, (err, data) => {
    if (err) {
      console.error(err);
      res.setStatus(404).send(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = {
  app,
};
