'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuperUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SuperUser.belongsTo('User', { as: 'parent', foreignKey: 'id' });
    }
  };
  SuperUser.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '_-_-_-',
    },
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'SuperUser',
    freezeTableName: true,
  });
  return SuperUser;
};
