var DataTypes = require("sequelize").DataTypes;
var _colleges = require("./colleges");
var _courses = require("./courses");
var _admission_details = require("./admission_details");
var _admission_criteria = require("./admission_criteria");
var _sequelizemeta = require("./sequelizemeta");
var _student_enrollments = require("./student_enrollments");
var _department_details = require("./department");
var _faculty_details = require("./faculty");
var _program_details = require("./programs");
var _users = require("./users");

function initModels(sequelize) {
  var faculty_details = _faculty_details(sequelize,DataTypes);
  var program_details = _program_details(sequelize,DataTypes);
  var department_details = _department_details(sequelize,DataTypes);
  var admission_details= _admission_details(sequelize,DataTypes);
  var admission_criteria= _admission_criteria(sequelize,DataTypes);
  var colleges = _colleges(sequelize, DataTypes);
  var courses = _courses(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var student_enrollments = _student_enrollments(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    faculty_details,
    program_details,
    admission_details,
    admission_criteria,
    colleges,
    courses,
    sequelizemeta,
    student_enrollments,
    users,
    department_details
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
