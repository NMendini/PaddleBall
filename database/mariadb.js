require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);

connection.connect((err) => {
  if (err) {
    console.error('problems!', err.stack);
  } else {
    console.log('Working!');
  }
});

// connection.query('DROP TABLE IF EXISTS scores;', (err, result) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(result);
//   }
// });

connection.query('CREATE TABLE IF NOT EXISTS scores (id INT NOT NULL AUTO_INCREMENT, initials VARCHAR(5), score INT, PRIMARY KEY (id));', (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});

connection.query("INSERT INTO scores (initials, score) VALUES('PAD', 50000)");
connection.query("INSERT INTO scores (initials, score) VALUES('DLE', 30000)");
connection.query("INSERT INTO scores (initials, score) VALUES('BAL', 10000)");

const getScores = (cb) => {
  connection.query('SELECT * FROM scores', (err, rows) => {
    if (err) {
      cb(err);
    } else {
      cb(null, rows);
    }
  });
};

const postScore = (score, cb) => {
  // console.log(score.initials)
  connection.query(`INSERT INTO scores (initials, score) VALUES(${score.initials}, ${score.score})`, (err, rows) => {
    if (err) {
      // console.log('SQL ERROR: ', err)
      cb(err);
    } else {
      cb(null, rows);
    }
  });
};

module.exports = {
  getScores,
  postScore,
};
