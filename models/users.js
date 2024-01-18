const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
// module.exports = function(sequelize, DataTypes) {
//   return sequelize.define('users', {
    const users = sequelize.define('users', {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      middle_name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      last_name: {  
        type: Sequelize.STRING(100),
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull: true,
        unique: "email"
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      country: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      phone_number: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true
      },
      role: {
        type: Sequelize.ENUM('ADMIN','FACULTY','STUDENT'),
        allowNull: true,
        defaultValue: "STUDENT"
      },
      fcmToken: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      accessToken: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      refreshToken: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      }
    })

    module.exports = users;
  // , {
  //   sequelize,
  //   tableName: 'users',
  //   timestamps: true,
  //   indexes: [
  //     {
  //       name: "PRIMARY",
  //       unique: true,
  //       using: "BTREE",
  //       fields: [
  //         { name: "id" },
  //       ]
  //     },
  //     {
  //       name: "email",
  //       unique: true,
  //       using: "BTREE",
  //       fields: [
  //         { name: "email" },
  //       ]
  //     },
  //   ]
  // });

