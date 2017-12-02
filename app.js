var express = require('express');
var todo = require('./routers/todos');
// var todos2 = require('./routers/todo2');
var app = express();
var _ = require('underscore');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use('/', todo)
  // todo2(app);
app.listen(3000, function() {
  console.log('Server is running');
});
