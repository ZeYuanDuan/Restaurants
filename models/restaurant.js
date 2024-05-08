'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Restaurant.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      name_en: {
        type: DataTypes.STRING(255)
      },
      category: {
        type: DataTypes.STRING(255)
      },
      image: {
        type: DataTypes.STRING(1024),
        allowNull: true
      },
      location: {
        type: DataTypes.STRING(255)
      },
      phone: {
        type: DataTypes.STRING(20)
      },
      google_map: {
        type: DataTypes.STRING(255)
      },
      rating: {
        type: DataTypes.DECIMAL(3, 1)
      },
      description: {
        type: DataTypes.TEXT
      }
    },
    {
      sequelize,
      modelName: 'Restaurant',
      tableName: 'restaurants'
    }
  )
  return Restaurant
}
