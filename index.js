var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

var connection = mysql.createConnection({
        host: process.env.MYSQL_HOST || 'localhost',
	user: 'root',
	password: 'password',
	database: 'users'
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})

app.use(bodyParser.json());

var server = app.listen(PORT,  HOST, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://localhost:%s", port)

});

app.get('/Health', (req, res) => {
        res.json({
                success: true,
                message: 'Logic may differnt but output should be same :- Rohit Nale'
        });
});

app.post('/user', function (req, res) {
	console.log(req.body);
	
	//[req.body.ID, req.body.Name, req.body.Age, req.body.Department, req.body.Subject]
	var sql = "INSERT INTO students (ID, Name, Age, Department, Subject) values (?, ?, ?, ?, ?)";
   connection.query(sql, [req.body.ID, req.body.Name, req.body.Age, req.body.Department, req.body.Subject], function (error, results, fields) {
          if (error) throw error;
          res.end(JSON.stringify(results));
        });
});



app.get('/user', function (req, res) {
   connection.query('select * from students', function (error, results, fields) {
          if (error) throw error;
          res.end(JSON.stringify(results));
        });
});


app.get('/user/:id', function (req, res) {
   connection.query('select * from students where ID=?', [req.params.id], function (error, results, fields) {
          if (error) throw error;
          res.end(JSON.stringify(results));
        });
});


app.put('/user', function (req, res) {

   //console.log(req.body);
   connection.query('UPDATE `students` SET `Name`=?,`Age`=?,`Department`=?,`Subject`=? where `ID`=?', [req.body.Name,req.body.Address, req.body.Department, req.body.Subject, req.body.ID], function (error, results, fields) {
          if (error) throw error;
                res.end("update", JSON.stringify(results));
        });
});

app.delete('/user/:id', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM `students` WHERE `ID`=?', [req.params.id], function (error, results, fields) {
          if (error) throw error;
          res.end('Record has been deleted!');
        });
});
