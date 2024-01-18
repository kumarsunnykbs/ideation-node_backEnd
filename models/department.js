const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
    const department_details = sequelize.define('department_details', {
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
      }
    }
    )

    module.exports = department_details;

// module.exports = function(sequelize, DataTypes) {
//   return sequelize.define('admission_criteria_details', {
    
//     id: {
//               autoIncrement: true,
//               type: DataTypes.BIGINT,
//               allowNull: false,
//               primaryKey: true
//             },
//             college_id: {
//               type: DataTypes.STRING(255),
//               allowNull: false
//             },
//             min_highschool_marks: {
//               type: DataTypes.STRING(255),
//               allowNull: false
//             },
//             additional_requirements: {
//               type: DataTypes.STRING(255),
//               allowNull: false
//             },
//             isDeleted: {
//               type: DataTypes.BOOLEAN,
//               allowNull: false,
//               defaultValue: 0
//             }


//   }, {
//     sequelize,
//     tableName: 'admission_criteria_details',
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
