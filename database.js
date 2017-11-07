var knex = require('knex')({
  client: 'mssql',
  connection: {
    host: '127.0.0.1',
    user: 'SA',
    password: 'Majid@2013',
    database: 'Todoapp'
  }
});

knex.schema.createTable('Todos', function(table) {
  table.string('taskname').primary();
  table.string('taskdescription');
  table.boolean('taskdone').defaultTo(false);
}).then();
