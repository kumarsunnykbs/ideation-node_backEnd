const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
    const admission_criteria = sequelize.define('admission_criteria_details', {
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
      min_highschool_marks: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      additional_requirements: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      application_status: {
        type: Sequelize.ENUM('unverified', 'level 1 cleared', 'level 2 cleared', 'level 3 cleared','level 4 cleared','rejected'),
        allowNull: false,
        defaultValue: 'unverified'
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      }
    }
    )

    module.exports = admission_criteria;

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
