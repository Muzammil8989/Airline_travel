'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FlightReservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FlightReservation.init({
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    type: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    airline: DataTypes.STRING,
    price: DataTypes.FLOAT,
    classs: DataTypes.STRING,
    fare: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    number: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FlightReservation',
  });
  return FlightReservation;
};