require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'database',
    host: '127.0.0.1',
    dialect: 'postgres',
  }
  // production: {
  //   use_env_variable: 'DATABASE_URL',
  // },
};