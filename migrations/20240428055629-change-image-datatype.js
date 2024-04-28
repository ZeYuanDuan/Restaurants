"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Restaurants", "image", {
      type: Sequelize.STRING(1024),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Restaurants", "image", {
      type: Sequelize.STRING(255),
    });
  },
};
