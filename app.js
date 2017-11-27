var knex = require('./database.js');
var express = require('express');
var app = express();
var _ = require('underscore');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.post('/addTask', function(req, res) {
  var body = req.body;
  var title = body.title;
  var description = body.description;
  var dueDate = body.dueDate;
  knex.select('title').from('Todos').where('title', title).then(
    function(row) {
      if (row.length === 0) {
        knex('Todos').insert({
          Title: title,
          Description: description,
          Due_date: dueDate
        }).then(function(body) {
          res.send(JSON.stringify(body, null, 2));
        }).catch(function(error) {
          res.send(JSON.stringify(error));
        });
      } else {
        res.send(JSON.stringify(req.body, null, 2) +
          ' does already exist');
      }
    })
});

app.put('/updateTask/:name', function(req, res) {
  var entries = req.query;
  var name = req.params.name;
  // console.log(name);
  var tableColumns = [];
  var count = 0;
  knex('Todos').where('Title', name).select('Title').then(
    function(row) {
      console.log(row);
      if (row.length === 0) {
        res.send('name does not exist');
        return 0;
      } else {
        console.log('name exist');
      }
    });
  knex('Todos').columnInfo().then(function(columns) {
    if (columns) {
      Object.keys(columns).forEach(function(key) {
        tableColumns[count] = key;
        count++;
      });
      return tableColumns;
    } else {
      console.log('Columns does not exist');
    }
  }).then(function(tableColumns) {
    var index = 0;
    Object.keys(entries).forEach(function(key) {
      // console.log(tableColumns);
      if (!_.contains(tableColumns, key)) {
        console.log(key +
          ' parameter does not exist, please enter correct parameters'
        );
        return 0;
      }
    })
  });

  knex('Todos').where('Title', name).update(entries).on('query-error',
    function(error, obj) {
      app.log(error);
    }).then(function() {
    res.send();
  }).catch(function(error) {
    res.send(error);
  })
});
app.get('/getTask/:name', function(req, res) {
  var taskName = req.params.name;
  knex.select('*').from('Todos').where({
    Title: taskName
  }).then(function(row) {
    if (row.length === 1) {
      var myrow = JSON.stringify(row, null, "\t");
      res.write(myrow);
      res.send();
    } else {
      res.send('The task does not exist');
    }
    res.end();
  });
});

app.get('/getAllTasks', function(req, res) {
  knex.select('*').from('Todos').then(function(rows) {
    if (rows.length !== 0) {
      var myrows = JSON.stringify(rows, null, "\t");
      res.write(myrows);
      res.send();
    } else {
      res.send('No entry exist');
    }
    res.end();
  });
});

app.delete('/deleteAllTasks', function(req, res) {
  knex('Todos').del().then(function(rows) {
    res.send(JSON.stringify('number of rows delete: ' + rows,
      null,
      "\t"));
    res.end();
  }).then(function(error) {
    res.send(JSON.stringify(error, null, "\t"));

  });
});

app.listen(3000, function() {
  console.log('Server is running');

});
