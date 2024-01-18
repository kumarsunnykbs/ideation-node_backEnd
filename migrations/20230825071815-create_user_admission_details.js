'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.createTable('user_admission_details', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      college_id: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      middle_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      suffix: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      different_name: {
        type: Sequelize.ENUM("0","1"),
        allowNull: false,
        defaultValue: 0
      },
      legal_sex: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      gender_identity: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      citizenship: {
        type: Sequelize.ENUM("0","1"),
        allowNull: false,
        defaultValue: 0
      },
      parent_marital_status: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      parent_permanent_residence: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      relationship_to_you: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      parent_first_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      parent_last_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      living_diseased: {
        type: Sequelize.ENUM("0","1"),
        allowNull: false,
        defaultValue: 0
      },
      attend_college: {
        type: Sequelize.ENUM("0","1"),
        allowNull: false,
        defaultValue: 0
      },
      area_of_interest: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      second_area_of_interest: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      previous_applied_on_ideation: {
        type: Sequelize.ENUM("0","1"),
        allowNull: false,
        defaultValue: 0
      },
      accelerated_management_program: {
        type: Sequelize.ENUM("0","1"),
        allowNull: false,
        defaultValue: 0
      },
      preprofessional_programs: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      scholarship_options: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      search_school: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      date_of_entry: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      graduation_date: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      academic_honor_code: {
        type: Sequelize.ENUM("0","1"),
        allowNull: false,
        defaultValue: 0
      },
      financial_aid: {
        type: Sequelize.ENUM("0","1"),
        allowNull: false,
        defaultValue: 0
      },
      finishing_up: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      profile_pic:{
        type: Sequelize.STRING(255),
        allowNull: false
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE

    })
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('user_admission_details');
  }
};
