'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
		return queryInterface.createTable('colleges', {

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
			  email: {
				type: Sequelize.STRING(255),
				allowNull: false
			  },
			  contact: {
				type: Sequelize.STRING(255),
				allowNull: false
			  },
			  websitelink: {
				type: Sequelize.STRING(255),
				allowNull: false
			  },
			  image: {
				type: Sequelize.STRING(255),
				allowNull: false
			  },
			  city: {
				type: Sequelize.STRING(255),
				allowNull: false
			  },
			  state: {
				type: Sequelize.STRING(255),
				allowNull: false
			  },
			  country: {
				type: Sequelize.STRING(255),
				allowNull: false
			  },
			  Established_Date: {
				type: Sequelize.STRING(255),
				allowNull: false
			  },
			  created_by: {
				type: Sequelize.STRING(255),
				allowNull: false
			  },
			  status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: 1 
			  },
			  isDeleted: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: 0
			  },
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
		});
  },

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('colleges');
	},
};
