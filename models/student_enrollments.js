const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student_enrollments', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    student_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    college_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('PERSUE','COMPLETED','DEGREE ISSUED','PAUSED'),
      allowNull: true,
      defaultValue: "PERSUE"
    }
  }, {
    sequelize,
    tableName: 'student_enrollments',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
