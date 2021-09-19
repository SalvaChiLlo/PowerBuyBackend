const winston = require('winston');
require('dotenv').config();

module.exports = {
  sequelize: {
    username: 'root',
    password: 'adminadmin',
    database: 'sequelize_database_development',
    host: 'omv.local',
    dialect: 'mysql',
    logging: (msg) => winston.info(msg),
  },

  // Seed database on startup
  seedDB: false,
};
