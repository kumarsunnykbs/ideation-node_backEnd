'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('program_details', {

      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      college_id: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      duration: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      session: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('program_details');
  }
};
