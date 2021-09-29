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
      Producto.hasMany(models.Caracteristica);
      Producto.hasMany(models.Imagen);
      Producto.hasMany(models.Opinion);
      Producto.belongsTo(models.LoteProducto);
      Producto.hasMany(models.CategoriaProducto);
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
    }
  }, {
    sequelize,
    modelName: 'Producto',
    freezeTableName: true,
  });
  return Producto;
};
