'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('department_details', {

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
      description: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      head: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      contact: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      faculties: {
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
    return queryInterface.dropTable('department_details');
  }
};
