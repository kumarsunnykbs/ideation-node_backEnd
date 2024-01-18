const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
const courses = sequelize.define('courses', {
  id: {
    autoIncrement: true,
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  college_id: {
    type: Sequelize.BIGINT,
    allowNull: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  course_duration: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  course_fee: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  course_startdate: {
    type: Sequelize.DATE,
    allowNull: true
  },
  course_price: {
    type: Sequelize.STRING(100),
    allowNull: true
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

})

module.exports= courses;
// module.exports = function(sequelize, DataTypes) {
//   return sequelize.define('courses', {
   
//   }, {
//     sequelize,
//     tableName: 'courses',
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
