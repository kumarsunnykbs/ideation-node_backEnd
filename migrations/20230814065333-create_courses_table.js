'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
		return queryInterface.createTable('courses', {

			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			college_id: {
				type: Sequelize.BIGINT
      		},
			name: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT(),
				allowNull: true,
			},
			course_duration: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			course_fee: {
				type: Sequelize.STRING(100),
				allowNull: true
			},
			course_startdate: {
				type: Sequelize.DATE
			},
			course_price: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			status: {
				type: Sequelize.TINYINT(1),
				allowNull: false,
				defaultValue: 1,
			},
			isDeleted: {
				type: Sequelize.TINYINT(1),
				allowNull: false,
				defaultValue: 0,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
		});
  },

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('courses');
	},
};
