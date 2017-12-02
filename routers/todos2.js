var knex = require('../database.js');

module.exports = function(app) {
  app.post('/addTask', function(req, res) {
    console.log(res.locals);
    var body = req.body;
    knex('Todos').insert(body)
      .on('query-response', function(response, obj) {
        res.json(obj);
      })
      .catch(function(error) {
        res.send(error);
      })
  });

  app.put('/updateTask/:name', function(req, res) {
    var entries = req.query;
    var name = req.params.name;
    knex('Todos').where('Title', name).update(entries)
      .on('query-response', function(response, obj) {
        res.json(obj);
      })
      .catch(function(error) {
        res.send(error);
      })
  });

  app.put('/updateAllTasks', function(req, res) {
    var entries = req.query;
    knex('Todos').update(entries)
      .on('query-response', function(response, obj) {
        res.json(obj);
      })
      .catch(function(error) {
        res.send(error);
      })
  });

  app.get('/getTask/:name', function(req, res) {
    var taskName = req.params.name;
    knex.select('*').from('Todos').where({
        Title: taskName
      })
      .on('query-response', function(response, obj) {
        res.json(obj);
      })
      .catch(function(error) {
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
}
