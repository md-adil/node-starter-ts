// Update with your config settings.
require('dotenv').config();

const config = require('./src/config/database');
module.exports = {
  client: 'mysql2',
  connection: config,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
