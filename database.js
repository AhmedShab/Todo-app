require('dotenv').config();
var knex = require('knex')({
  client: 'mssql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
  }
});

knex.schema.createTable(process.env.TABLE_NAME, function(table) {
  table.string(process.env.TABLE_TITLE_COLUMN).primary();
  table.string(process.env.TABLE_DESCRIPTION_COLUMN);
  table.date(process.env.TABLE_DUE_DATE_COLUMN);
  table.boolean(process.env.TABLE_DONE_COLUMN).defaultTo(false);
}).then();
