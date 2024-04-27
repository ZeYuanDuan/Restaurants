"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Restaurants", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      name_en: {
        type: Sequelize.STRING(255),
      },
      category: {
        type: Sequelize.STRING(255),
      },
      image: {
        type: Sequelize.STRING(255),
      },
      location: {
        type: Sequelize.STRING(255),
      },
      phone: {
        type: Sequelize.STRING(20),
      },
      google_map: {
        type: Sequelize.STRING(255),
      },
      rating: {
        type: Sequelize.DECIMAL(3, 1),
      },
      description: {
        type: Sequelize.TEXT,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Restaurants");
  },
};
