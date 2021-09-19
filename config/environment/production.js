module.exports = {
  // Server IP
  ip: process.env.HEROKU_IP || process.env.IP || undefined,

  // Server port
  port: process.env.HEROKU_PORT || process.env.PORT || 9000,

  sequelize:
  {
    username: 'root',
    password: 'adminadmin',
    database: 'sequelize_database_production',
    host: 'omv.local',
    dialect: 'mysql',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },
};
