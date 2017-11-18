var knex = require('./database.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var jsonParser = bodyParser.json();
app.use(bodyParser.json());

app.post('/addTask', function(req, res) {
  var body = req.body;
  var title = body.title;
  var description = body.description;
  var dueDate = body.dueDate;


  knex('Todos').insert({
    Title: title,
    Description: description,
    Due_date: dueDate
  }).then();
  res.send(JSON.stringify(req.body, null, 2));


});
app.listen(3000, function() {
  console.log('Server is running');

});
