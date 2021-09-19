const Sequelize = require('sequelize');

const config = require('../config/environment');

console.log(config);

const db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize),
};

// Insert models below
db.Company = require('../api/company/company.model')(db.sequelize, Sequelize.DataTypes);
db.Product = require('../api/product/product.model')(db.sequelize, Sequelize.DataTypes);
db.User = require('../api/user/user.model')(db.sequelize, Sequelize.DataTypes);

// Relations
db.Company.belongsTo(db.User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

db.Product.belongsTo(db.Company, {
  foreignKey: {
    name: 'companyId',
    allowNull: false,
  },
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
db.Company.hasMany(db.Product, { foreignKey: 'companyId', targetKey: 'id' });
console.log(db.Company);
module.exports = db;
