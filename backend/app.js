require("dotenv").config()
const mysql = require('mysql');
console.log(process.env)

const connection = mysql.createConnection({
  host: process.env.dbhost,
  user: process.env.dbusername,
  password: process.env.dbpassword,
  database: process.env.dbname
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/users', function(req, res) {
  connection.query('SELECT * FROM user', (err,rows) => {
    if(err) throw err;
    res.send(rows);
  })
})

app.listen(8080)
console.log('Web server running on port 8080')

/*
// EXAMPLE QUERIES
// Query to get data:
connection.query('SELECT * FROM user', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:');
    console.log(rows);
});
// Query to add data:
const user = { username: 'user', email: 'email@emails.com', password: 'pass' };
connection.query('INSERT INTO user SET ?', user, (err, res) => {
  if(err) throw err;

  console.log('Last insert ID:', res.insertId);
});

// Query to update data:
connection.query(
  'UPDATE user SET password = ? Where userid = ?',
  ['newpass', 1],
  (err, result) => {
    if (err) throw err;

    console.log(`Changed ${result.changedRows} row(s)`);
  }
);

//Query to delete data:
connection.query(
  'DELETE FROM user WHERE id = ?', [1], (err, result) => {
    if (err) throw err;

    console.log(`Deleted ${result.affectedRows} row(s)`);
  }
);
*/