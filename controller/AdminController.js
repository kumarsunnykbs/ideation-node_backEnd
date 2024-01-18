const {AdminService} = require('../services/index');
const AWS = require("aws-sdk");
const path = require("path");
const USER_KEY = process.env.ACCESS_KEY;
const USER_SECRET = process.env.SECRET_KEY;
const BUCKET_NAME = process.env.BUCKET;

let s3bucket = new AWS.S3({
  accessKeyId: USER_KEY,
  secretAccessKey: USER_SECRET,
  Bucket: BUCKET_NAME,
});

class AdminController {
	/** ***** Auth Controller: Method to Signup User ******/
	async addColleges(req, res, next) {
		try {
			if(req.files){
				let getFile = req.files.file; //mimetype
				var ext = path.extname(getFile.name);
				let imageTitle = getFile.name;
				var filename = Date.now() + "_" + imageTitle + ext;
				var fileData = getFile["data"];
				var r = 0;
				var imageName = `${imageTitle}_${new Date().getTime()}`;
				s3bucket.createBucket(function () {
					var params = {
					  Bucket: BUCKET_NAME + "/college_pic/" + imageName,
					  Key: filename,
					  ACL: "public-read",
					  Body: fileData,
					};
					s3bucket.upload(params,async function (err, data) {
					  if (err) {
						console.log("Error uploading", err);
					  }
					  var filepath = data.Location;
					  await AdminService.addColleges(filepath, req, res, next);
					});
				  });
			}else{
				return res.status(500).json({status: false, message: 'Please select image file'});
			}
		} catch (error) {
			console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',error);
			return res.status(500).json({status: false, message: 'error'});
		}
	}
	async editColleges(req, res, next) {
		try {
			if(req.files){
				let getFile = req.files.file; //mimetype
				var ext = path.extname(getFile.name);
				let imageTitle = getFile.name;
				var filename = Date.now() + "_" + imageTitle + ext;
				var fileData = getFile["data"];
				var r = 0;
				var imageName = `${imageTitle}_${new Date().getTime()}`;
				s3bucket.createBucket(function () {
					var params = {
					  Bucket: BUCKET_NAME + "/college_pic/" + imageName,
					  Key: filename,
					  ACL: "public-read",
					  Body: fileData,
					};
					s3bucket.upload(params,async function (err, data) {
					  if (err) {
						console.log("Error uploading", err);
					  }
					  var filepath = data.Location;
					  await AdminService.editColleges(filepath,req, res, next);
					});
				  });
			}else{
				return res.status(500).json({status: false, message: 'Please select image file'});
			}
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}


	async getAllColleges(req, res, next) {
		try {
			await AdminService.getAllColleges(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	async getCollegeById(req, res, next) {
		try {
			await AdminService.getCollegeById(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}


	async deleteCollegeById(req, res, next) {
		try {
			await AdminService.deleteCollegeById(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	async addCourses(req, res, next) {
		try {
			await AdminService.addCourses(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	async editCourses(req, res, next) {
		try {
			await AdminService.editCourses(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	async getAllCourses(req, res, next) {
		try {
			await AdminService.getAllCourses(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	async deleteCourses(req, res, next) {
		try {
			await AdminService.deleteCourses(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}


	async addAdminnsionFormDetails(req, res, next) {
		try {
			if(req.files){
				let getFile = req.files.file; //mimetype
				var ext = path.extname(getFile.name);
				let imageTitle = getFile.name;
				var filename = Date.now() + "_" + imageTitle + ext;
				var fileData = getFile["data"];
				var r = 0;
				var imageName = `${imageTitle}_${new Date().getTime()}`;
				s3bucket.createBucket(function () {
					var params = {
					  Bucket: BUCKET_NAME + "/profile_pic/" + imageName,
					  Key: filename,
					  ACL: "public-read",
					  Body: fileData,
					};
					s3bucket.upload(params,async function (err, data) {
					  if (err) {
						console.log("Error uploading", err);
					  }
					  var filepath = data.Location;
					  await AdminService.addAdminnsionFormDetails(filepath, req, res, next);
					});
				  });
			}else{
				return res.status(500).json({status: false, message: "Please select image file."})
			}
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	async editAdminnsionFormDetails(req, res, next) {
		try {
			if(req.files){
				let getFile = req.files.file; //mimetype
				var ext = path.extname(getFile.name);
				let imageTitle = getFile.name;
				var filename = Date.now() + "_" + imageTitle + ext;
				var fileData = getFile["data"];
				var r = 0;
				var imageName = `${imageTitle}_${new Date().getTime()}`;
				s3bucket.createBucket(function () {
					var params = {
					  Bucket: BUCKET_NAME + "/profile_pic/" + imageName,
					  Key: filename,
					  ACL: "public-read",
					  Body: fileData,
					};
					s3bucket.upload(params,async function (err, data) {
					  if (err) {
						console.log("Error uploading", err);
					  }
					  var filepath = data.Location;
					  await AdminService.editAdminnsionFormDetails(filepath, req, res, next);
					});
				  });
			}else{
				return res.status(500).json({status: false, message: "Please select image file."})
			}
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	async getAdminnsionFormDetails(req, res, next) {
		try {
			await AdminService.getAdminnsionFormDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}


	async deleteAdminnsionFormDetails(req, res, next) {
		try {
			await AdminService.deleteAdminnsionFormDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	async addAdmissionCriteria(req, res, next) {
		try {
			await AdminService.addAdmissionCriteria(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}


	async editAdmissionCriteria(req, res, next) {
		try {
			await AdminService.editAdmissionCriteria(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}


	async getAdmissionCriteria(req, res, next) {
		try {
			await AdminService.getAdmissionCriteria(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	async deleteAdmissionCriteria(req, res, next) {
		try {
			await AdminService.deleteAdmissionCriteria(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	async updateApplicationStatus(req, res, next) {
		try {
			await AdminService.updateApplicationStatus(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	async addDepartmentDetails(req, res, next) {
		try {
			await AdminService.addDepartmentDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}


	async editDepartmentDetails(req, res, next) {
		try {
			await AdminService.editDepartmentDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

		async getAllDepartmentDetails(req, res, next) {
		try {
			await AdminService.getAllDepartmentDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	async deleteDepartmentDetails(req, res, next) {
		try {
			await AdminService.deleteDepartmentDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	async addFaculty(req, res, next) {
		try {

			if(req.files){
				let getFile = req.files.file; //mimetype
				var ext = path.extname(getFile.name);
				let imageTitle = getFile.name;
				var filename = Date.now() + "_" + imageTitle + ext;
				var fileData = getFile["data"];
				var r = 0;
				var imageName = `${imageTitle}_${new Date().getTime()}`;
				s3bucket.createBucket(function () {
					var params = {
					  Bucket: BUCKET_NAME + "/faculty_pic/" + imageName,
					  Key: filename,
					  ACL: "public-read",
					  Body: fileData,
					};
					s3bucket.upload(params,async function (err, data) {
					  if (err) {
						console.log("Error uploading", err);
					  }
					  var filepath = data.Location;
					  await AdminService.addFaculty(filepath, req, res, next);
					});
				  });
			}else{
				return res.status(500).json({status: false, message: 'Please select image file'});
			}
			
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	
	async editFaculty(req, res, next) {
		try {
			if(req.files){
				let getFile = req.files.file; //mimetype
				var ext = path.extname(getFile.name);
				let imageTitle = getFile.name;
				var filename = Date.now() + "_" + imageTitle + ext;
				var fileData = getFile["data"];
				var r = 0;
				var imageName = `${imageTitle}_${new Date().getTime()}`;
				s3bucket.createBucket(function () {
					var params = {
					  Bucket: BUCKET_NAME + "/faculty_pic/" + imageName,
					  Key: filename,
					  ACL: "public-read",
					  Body: fileData,
					};
					s3bucket.upload(params,async function (err, data) {
					  if (err) {
						console.log("Error uploading", err);
					  }
					  var filepath = data.Location;
					  await AdminService.editFaculty(filepath, req, res, next);
					});
				  });
			}else{
				return res.status(500).json({status: false, message: 'Please select image file'});
			}
			
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}
	
	async getAllFaculty(req, res, next) {
		try {
			await AdminService.getAllFaculty(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}
	
	async deleteFaculty(req, res, next) {
		try {
			await AdminService.deleteFaculty(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	async addProgramDetails(req, res, next) {
		try {
			await AdminService.addProgramDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}


	async editProgramDetails(req, res, next) {
		try {
			await AdminService.editProgramDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}


	async getAllProgramDetails(req, res, next) {
		try {
			await AdminService.getAllProgramDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}


	async deleteProgramDetails(req, res, next) {
		try {
			await AdminService.deleteProgramDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}


	async getDetailsByCollegeId(req, res, next) {
		try {
			await AdminService.getDetailsByCollegeId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}


	async getStudentsByCollegeId(req, res, next) {
		try {
			await AdminService.getStudentsByCollegeId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}
}




module.exports = new AdminController();
