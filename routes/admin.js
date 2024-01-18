const express = require('express');
const router = express.Router();
const {AdminController} = require('../controller/index');
const {ApiAuthValidator} = require('../middleware/authValidator/index');
const {AdminDataValidator} = require('../middleware/dataValidator/index');


//colleges api's routes
router.post('/addColleges', AdminDataValidator.addColleges, ApiAuthValidator.validateAccessToken, AdminController.addColleges);
router.post('/editColleges',AdminDataValidator.editColleges, ApiAuthValidator.validateAccessToken, AdminController.editColleges);
router.get('/getAllColleges', ApiAuthValidator.validateAccessToken, AdminController.getAllColleges);
router.post('/deleteCollegeById/:id', ApiAuthValidator.validateAccessToken, AdminController.deleteCollegeById);
router.get('/getCollegeById/:id', ApiAuthValidator.validateAccessToken, AdminController.getCollegeById);


//courses api's routes  
router.post('/addCourses',AdminDataValidator.addCourses, ApiAuthValidator.validateAccessToken, AdminController.addCourses);
router.post('/editCourses', ApiAuthValidator.validateAccessToken, AdminController.editCourses);
router.get('/getAllCourses', ApiAuthValidator.validateAccessToken, AdminController.getAllCourses);
router.post('/deleteCourses/:id', ApiAuthValidator.validateAccessToken, AdminController.deleteCourses);

//admission form api's routes:
router.post('/addAdminnsionFormDetails', ApiAuthValidator.validateAccessToken, AdminController.addAdminnsionFormDetails);
router.post('/editAdminnsionFormDetails', AdminDataValidator.editAdmissionDetails,ApiAuthValidator.validateAccessToken, AdminController.editAdminnsionFormDetails);
router.get('/getAdminnsionFormDetails',ApiAuthValidator.validateAccessToken, AdminController.getAdminnsionFormDetails);
router.post('/deleteAdminnsionFormDetails/:id',ApiAuthValidator.validateAccessToken, AdminController.deleteAdminnsionFormDetails);


//admission criteria api routes
router.post('/addAdmissionCriteria',ApiAuthValidator.validateAccessToken, AdminController.addAdmissionCriteria);
router.post('/editAdmissionCriteria',ApiAuthValidator.validateAccessToken, AdminController.editAdmissionCriteria);
router.get('/getAdmissionCriteria',ApiAuthValidator.validateAccessToken, AdminController.getAdmissionCriteria);
router.post('/deleteAdmissionCriteria/:id',ApiAuthValidator.validateAccessToken, AdminController.deleteAdmissionCriteria);

router.post('/updateApplicationStatus', ApiAuthValidator.validateAccessToken, AdminController.updateApplicationStatus);


//department api routes
router.post('/addDepartmentDetails', AdminDataValidator.addDepartment, ApiAuthValidator.validateAccessToken, AdminController.addDepartmentDetails);
router.post('/editDepartmentDetails', AdminDataValidator.editDepartment, ApiAuthValidator.validateAccessToken, AdminController.editDepartmentDetails);
router.get('/getAllDepartmentDetails', ApiAuthValidator.validateAccessToken, AdminController.getAllDepartmentDetails);
router.post('/deleteDepartmentDetails/:id', ApiAuthValidator.validateAccessToken, AdminController.deleteDepartmentDetails);

//faculties api routes
router.post('/addFaculty', AdminDataValidator.addFaculty, ApiAuthValidator.validateAccessToken, AdminController.addFaculty);
router.post('/editFaculty', AdminDataValidator.editFaculty, ApiAuthValidator.validateAccessToken, AdminController.editFaculty);
router.get('/getAllFaculty', ApiAuthValidator.validateAccessToken, AdminController.getAllFaculty);
router.post('/deleteFaculty/:id', ApiAuthValidator.validateAccessToken, AdminController.deleteFaculty);
router.get('/getDetailsByCollegeId/:college_id', AdminController.getDetailsByCollegeId);

//programs api routes
router.post('/addProgramDetails', AdminDataValidator.addProgram, ApiAuthValidator.validateAccessToken, AdminController.addProgramDetails);
router.post('/editProgramDetails', AdminDataValidator.editProgram, ApiAuthValidator.validateAccessToken, AdminController.editProgramDetails);
router.get('/getAllProgramDetails', ApiAuthValidator.validateAccessToken, AdminController.getAllProgramDetails);
router.post('/deleteProgramDetails/:id', ApiAuthValidator.validateAccessToken, AdminController.deleteProgramDetails);

router.get('/getStudentsByCollegeId/:college_id', ApiAuthValidator.validateAccessToken, AdminController.getStudentsByCollegeId);
router.get('/getStudentsByCollegeId', ApiAuthValidator.validateAccessToken, AdminController.getStudentsByCollegeId);
module.exports = router;
