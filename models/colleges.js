const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
    const colleges = sequelize.define('colleges', {
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
      }
    }

    )

    module.exports = colleges;

// module.exports = function(sequelize, DataTypes) {
//   return sequelize.define('colleges', {
//  , {
//     sequelize,
//     tableName: 'colleges',
//     timestamps: true,
//     indexes: [
//       {
//         name: "PRIMARY",
//         unique: true,
//         using: "BTREE",
//         fields: [
//           { name: "id" },
//         ]
//       },
//     ]
//   });
// };
