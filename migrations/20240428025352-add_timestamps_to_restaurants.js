'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Restaurants', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    })
    await queryInterface.addColumn('Restaurants', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'createdAt')
    await queryInterface.removeColumn('Users', 'updatedAt')
  }
}
