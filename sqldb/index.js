const Sequelize = require('sequelize');

const config = require('../config/environment');

const db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize),
};

// // Insert models below
// db.Post = require('./Post')(db.sequelize, Sequelize.DataTypes);
db.User = require('./User')(db.sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
