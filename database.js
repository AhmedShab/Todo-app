require('mssql');
require('dotenv').config();
var knex = require('knex')({
  client: 'mssql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'Todoapp'
  }
});

knex.schema.withSchema('dbo').createTableIfNotExists('Todos', function(table) {
  table.string('Title').primary();
  table.string('Description');
  table.date('Due_date');
  table.boolean('Task_Done').defaultTo(false);
}).then();

module.exports = knex;
