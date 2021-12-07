'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cliente.hasMany(models.Opinion)
      Cliente.belongsToMany(models.CategoriaProducto, {
        through: models.Interes
      })
    }
  };
  Cliente.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    imageURL: {
      type: DataTypes.TEXT,
      defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    },
    favoritos: {
      type: DataTypes.TEXT,
      defaultValues: "[]"
    },
    historial: {
      type: DataTypes.TEXT,
      defaultValues: "[]"
    }
  }, {
    sequelize,
    modelName: 'Cliente',
    freezeTableName: true,
  });
  return Cliente;
};
