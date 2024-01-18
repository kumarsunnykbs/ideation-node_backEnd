'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
		return queryInterface.createTable('users', {

			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			first_name: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			middle_name: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			last_name: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			username: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			email: {
				type: Sequelize.STRING(200),
				unique: true,
			},
			password: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			country: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			phone_number: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			date_of_birth: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			password: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			role: {
				type: Sequelize.ENUM,
				values: ['ADMIN', 'FACULTY', 'STUDENT'],
				defaultValue: 'STUDENT',
			},
			fcmToken: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			accessToken: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			refreshToken: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			status: {
				type: Sequelize.TINYINT(1),
				allowNull: false,
				defaultValue: 0,
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
		return queryInterface.dropTable('users');
	},
};
