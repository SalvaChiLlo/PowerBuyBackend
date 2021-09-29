'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Opinion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Opinion.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    valoracion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    opinion: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Opinion',
    freezeTableName: true,
  });
  return Opinion;
};
