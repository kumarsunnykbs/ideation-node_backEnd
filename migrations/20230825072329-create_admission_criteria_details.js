"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("admission_criteria_details", {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      college_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      min_highschool_marks: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      additional_requirements: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      application_status: {
        type: Sequelize.ENUM,
        values: [
          "unverified",
          "level 1 cleared",
          "level 2 cleared",
          "level 3 cleared",
          "level 4 cleared",
          "rejected"
        ],
        defaultValue: "unverified",
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("admission_criteria_details");
  },
};
