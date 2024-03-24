'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Flight.init({
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    date: DataTypes.STRING,
    time: DataTypes.STRING,
    type: DataTypes.STRING,
    duration: DataTypes.STRING,
    airline: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    availableSeat: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};