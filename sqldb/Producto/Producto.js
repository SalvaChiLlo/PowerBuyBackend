'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Producto.hasMany(models.Imagen);
      Producto.hasMany(models.Opinion);
    }
  };
  Producto.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING
    },
    cantidadDisponible: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Math.floor(Math.random() * (200 - 100)) + 100
    },
    caracteristicas: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  }, {
    sequelize,
    modelName: 'Producto',
    freezeTableName: true,
  });
  return Producto;
};
