'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pago.hasOne(models.LoteProducto);
      Pago.hasOne(models.Cliente)
    }
  };
  Pago.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dinero: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Pago',
    freezeTableName: true,
  });
  return Pago;
};
