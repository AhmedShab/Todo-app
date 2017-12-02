var knex = require('./database.js');
var express = require('express');
var app = express();
var _ = require('underscore');
var bodyParser = require('body-parser');
app.use(bodyParser.json());


app.post('/addTask', function(req, res) {
  var body = req.body;
  knex('Todos').insert(body).on('query-error',
    function(error) {
      console.log(error);
    }).then(function() {
    res.json('Insert is done');
  }).catch(function(error) {
    console.log(error);
    res.send(error);
  })
});

app.put('/updateTask/:name', function(req, res) {
  var entries = req.query;
  var name = req.params.name;
  knex('Todos').where('Title', name).update(entries).on('query-error',
    function(error) {
      console.log(error);
    }).then(function() {
    res.send('Update is done');
  }).catch(function(error) {
    res.send(error);
  })
});

app.put('/updateAllTasks', function(req, res) {
  var entries = req.query;
  knex('Todos').update(entries).on('query-error',
    function(error) {
      console.log(error);
    }).then(function() {
    res.send('Update is done');
  }).catch(function(error) {
    res.send(error);
  })
});

app.get('/getTask/:name', function(req, res) {
  var taskName = req.params.name;
  knex.select('*').from('Todos').where({
    Title: taskName
  }).on('query-error',
    function(error, row) {
      console.log(error);
    }).then(function(row) {
    res.json(row);
  }).catch(function(error) {
    res.send(error);
  })
});

app.get('/getAllTasks', function(req, res) {
  knex.select('*').from('Todos').then(function(rows) {
    if (rows.length !== 0) {
      res.json(rows);
    } else {
      res.send('No entry exist');
    }
  });
});

app.delete('/deleteAllTasks', function(req, res) {
  knex('Todos').del().then(function(rows) {
    res.send('number of rows delete: ' + row);
  }).catch(function(error) {
    res.status(500).send();
  })
});

app.listen(3000, function() {
  console.log('Server is running');

});
