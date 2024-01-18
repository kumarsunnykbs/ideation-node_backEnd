'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
		return queryInterface.createTable('student_enrollments', {

			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			student_id: {
				type: Sequelize.BIGINT
			},
			college_id: {
				type: Sequelize.BIGINT
			},
			role: {
				type: Sequelize.ENUM,
				values: ['PERSUE', 'COMPLETED', 'DEGREE ISSUED', 'PAUSED'],
				defaultValue: 'PERSUE',
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
		});
  },

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('student_enrollments');
	},
};
