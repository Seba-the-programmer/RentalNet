'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  logs.init({
    user: DataTypes.INTEGER,
    movie: DataTypes.INTEGER,
    action: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'logs',
  });
  return logs;
};