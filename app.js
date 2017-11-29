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
          res.json(body);
        }).catch(function(error) {
          res.json(error);
        });
      } else {
        res.json(req.body +
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
      } else {
        res.send('name exist');
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
      res.send('Columns does not exist');
    }
  }).then(function(tableColumns) {
    var index = 0;
    var flag = true;
    Object.keys(entries).forEach(function(key) {
      // console.log(tableColumns);
      if (!_.contains(tableColumns, key)) {
        flag = false;
      }

    });
    console.log('loop after if');
    if (flag) {
      res.send(key +
        ' parameter does not exist, please enter correct parameters'
      );
    }
  });

  knex('Todos').where('Title', name).update(entries).on('query-error',
    function(error) {
      app.log(error);
    })
});

app.put('/updateAllTasks', function(req, res) {
  var entries = req.query;
  console.log(req.query);
  if (req.query.Title) {
    res.send(
      'YOu can not update the title for all entries, this violates tables primary key'
    );
  }

  var tableColumns = [];
  var count = 0;
  knex('Todos').select('*').then(
    function(row) {
      // console.log(row);
      if (row.length === 0) {
        res.send('no data exist');
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

  knex('Todos').update(entries).on('query-error',
    function(error) {
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
      res.json(row);
    } else {
      res.send('The task does not exist');
    }
  });
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
    res.send(JSON.stringify('number of rows delete: ' + rows,
      null,
      "\t"));
  }).then(function(error) {
    res.json(error);
  });
});

app.listen(3000, function() {
  console.log('Server is running');

});
