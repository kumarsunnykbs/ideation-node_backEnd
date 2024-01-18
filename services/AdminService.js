const SHA256 = require("crypto-js/sha256");

const commonConfig = require("../config/common.config");
const collegeModel = require("../models/colleges");
const courseModel = require("../models/courses");

// const otpModel = require('../models/userOtp');
const tokenService = require("./TokenService");
// const userOtp = require('../models/userOtp');
const sendOtpTOPhone = require("../common/twilioSms");
const sendOtpMail = require("../common/mailers/sendMail");
const moment = require("moment");
const path = require("path");
const ROOT_PATH = require("../rootpath");
const { Op } = require("sequelize");
const admission_details = require("../models/admission_details");
const admission_criteria = require("../models/admission_criteria");
const { QueryTypes } = require("sequelize");
const sequelize = require("../database/connection");
const { logger } = require("handlebars");
const department_details = require("../models/department");
const faculty_details = require("../models/faculty");
const program_details = require("../models/programs");

class AdminService {
  async addColleges(path, req, res, next) {
    try {
      const payload = req.body;

      let creater = req.decoded.username;
      const insertData = {
        name: payload.name,
        email: payload.email,
        contact: payload.contact,
        websitelink: payload.websitelink,
        city: payload.city,
        state: payload.state,
        country: payload.country,
        image: path,
        Established_Date: payload.Established_Date,
        created_by: creater,
      };

      const result = await collegeModel.create(insertData);

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Colleges created successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async editColleges(path, req, res, next) {
    try {
      const payload = req.body;

      let creater = req.decoded.username;
      // console.log(creater);
      // return
      const upData = {
        name: payload.name,
        email: payload.email,
        contact: payload.contact,
        websitelink: payload.websitelink,
        city: payload.city,
        state: payload.state,
        country: payload.country,
        image: path,
        Established_Date: payload.Established_Date,
        created_by: creater,
      };

      const result = await collegeModel.update(upData, {
        where: { id: payload.id },
      });

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Colleges updated successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }
  async getAllColleges(req, res, next) {
    try {
      const result = await collegeModel.findAll({ where: { isDeleted: 0 } });

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Colleges fetched successfully",
          body: result,
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async getCollegeById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await collegeModel.findOne({
        where:  { id: id, isDeleted: 0 },
      });

      if (result) {
        return res.status(200).json({
          status: true,
          message: "College fetched successfully",
          body: result,
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "No records found.", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async deleteCollegeById(req, res, next) {
    try {
      const result = await collegeModel.update(
        { isDeleted: 1 },
        { where: { id: req.params.id } }
      );

      if (result) {
        return res.status(200).json({
          status: true,
          message: "College deleted successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async addCourses(req, res, next) {
    try {
      const payload = req.body;

      const insertData = {
        college_id: payload.college_id,
        name: payload.name,
        description: payload.description,
        course_duration: payload.course_duration,
        course_fee: payload.course_fee,
        course_startdate: payload.course_startdate,
        course_price: payload.course_price,
      };

      const result = await courseModel.create(insertData);

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Courses created successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async editCourses(req, res, next) {
    try {
      const payload = req.body;

      const upData = {
        college_id: payload.college_id,
        name: payload.name,
        description: payload.description,
        course_duration: payload.course_duration,
        course_fee: payload.course_fee,
        course_startdate: payload.course_startdate,
        course_price: payload.course_price,
      };

      const result = await courseModel.update(upData, {
        where: { id: payload.id },
      });

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Courses updated successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async getAllCourses(req, res, next) {
    try {
      const result = await courseModel.findAll({ where: { isDeleted: 0 } });

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Courses fetched successfully",
          body: result,
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async deleteCourses(req, res, next) {
    try {
      const result = await courseModel.update(
        { isDeleted: 1 },
        { where: { id: req.params.id } }
      );

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Course deleted successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async addAdminnsionFormDetails(path, req, res, next) {
    try {
      const payload = req.body;

      const insertData = {
        college_id: payload.college_id,
        profile_pic: path,
        first_name: payload.first_name,
        middle_name: payload.middle_name,
        last_name: payload.last_name,
        suffix: payload.suffix,
        // different_name: payload.different_name,
        legal_sex: payload.legal_sex,
        gender: payload.gender,
        gender_identity: payload.gender_identity,
        address: payload.address,
        // citizenship: payload.citizenship,
        parent_marital_status: payload.parent_marital_status,
        parent_permanent_residence: payload.parent_permanent_residence,
        relationship_to_you: payload.relationship_to_you,
        title: payload.title,
        parent_first_name: payload.parent_first_name,
        parent_last_name: payload.parent_last_name,
        // living_diseased: payload.living_diseased,
        // attend_college: payload.attend_college,
        area_of_interest: payload.area_of_interest,
        second_area_of_interest: payload.second_area_of_interest,
        // previous_applied_on_ideation: payload.previous_applied_on_ideation,
        // accelerated_management_program: payload.accelerated_management_program,
        preprofessional_programs: payload.preprofessional_programs,
        scholarship_options: payload.scholarship_options,
        search_school: payload.search_school,
        date_of_entry: payload.date_of_entry,
        graduation_date: payload.graduation_date,
        // academic_honor_code: payload.academic_honor_code,
        // financial_aid: payload.financial_aid,
        finishing_up: payload.finishing_up
      };

      const result = await admission_details.create(insertData);

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Admission Details created successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async editAdminnsionFormDetails(path, req, res, next) {
    try {
      const payload = req.body;

      const upData = {
        college_id: payload.college_id,
        name_of_applicant: payload.name_of_applicant,
        guardian_name: payload.guardian_name,
        guardian_occupation: payload.guardian_occupation,
        date_of_birth: payload.date_of_birth,
        permanent_address: payload.permanent_address,
        correspondence_address: payload.correspondence_address,
        applicant_phone: payload.applicant_phone,
        guardian_phone: payload.guardian_phone,
        academic_qualification: payload.academic_qualification,
        select_program: payload.select_program,
        profile_pic: path,
      };

      const result = await admission_details.update(upData, {
        where: { id: payload.id },
      });

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Admission details updated successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async getAdminnsionFormDetails(req, res, next) {
    try {
      const result = await admission_details.findAll({
        where: { isDeleted: 0 },
      });

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Admission Details fetched successfully",
          body: result,
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async deleteAdminnsionFormDetails(req, res, next) {
    try {
      const result = await admission_details.update(
        { isDeleted: 1 },
        { where: { id: req.params.id } }
      );

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Admission Details deleted successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async addAdmissionCriteria(req, res, next) {
    try {
      const payload = req.body;

      const insertData = {
        college_id: payload.college_id,
        min_highschool_marks: payload.min_highschool_marks,
        additional_requirements: payload.additional_requirements,
      };

      const result = await admission_criteria.create(insertData);

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Admission Criteria created successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async editAdmissionCriteria(req, res, next) {
    try {
      const payload = req.body;

      const upData = {
        college_id: payload.college_id,
        min_highschool_marks: payload.min_highschool_marks,
        additional_requirements: payload.additional_requirements,
      };

      const result = await admission_criteria.update(upData, {
        where: { id: payload.id },
      });

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Admission Criteria updated successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async getAdmissionCriteria(req, res, next) {
    try {
      const result = await admission_criteria.findAll({
        where: { isDeleted: 0 },
      });

      if (result) {
        return res.status(200).json({
          status: true,
          message: result.length
            ? "Admission Criteria fetched successfully"
            : "No records found",
          body: result,
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "No records found", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async deleteAdmissionCriteria(req, res, next) {
    try {
      const result = await admission_criteria.update(
        { isDeleted: 1 },
        { where: { id: req.params.id } }
      );

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Admission Criteria deleted successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async updateApplicationStatus(req, res, next) {
    try {
      // const result = await sequelize.query(
      //   "SELECT * FROM `admission_criteria_details` where isDeleted = 0",
      //   { type: QueryTypes.SELECT }
      // );
const result = await admission_criteria.findAll({where: {isDeleted: 0}, raw: true});
      if (result) {
        const match = result.filter((item) => {
          return item.min_highschool_marks >= 80;
        });
        match.map(async (item) => {
          const upData = {
            application_status: "level 1 cleared",
          };
          await admission_criteria.update(upData, {
            where: { id: item.id },
          });
        });

        const match1 = result.filter((item) => {
          return item.min_highschool_marks < 80;
        });

        match1.map(async (item) => {
          const upData = {
            application_status: "rejected",
          };
          await admission_criteria.update(upData, {
            where: { id: item.id },
          });
        });
        return res.status(200).json({
          status: true,
          message: "Admission status updated successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async addDepartmentDetails(req, res, next) {
    try {
      const payload = req.body;

      const insertData = {
        name: payload.name,
        description: payload.description,
        head: payload.head,
        contact: payload.contact,
        faculties: payload.faculties,
      };

      const result = await department_details.create(insertData);

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Department created successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async editDepartmentDetails(req, res, next) {
    try {
      const payload = req.body;

      const upData = {
        name: payload.name,
        description: payload.description,
        head: payload.head,
        contact: payload.contact,
        faculties: payload.faculties,
      };

      const result = await department_details.update(upData, {
        where: { id: payload.id, isDeleted: 0 },
      });

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Department Details updated successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async getAllDepartmentDetails(req, res, next) {
    try {
      const result = await department_details.findAll({
        where: { isDeleted: 0 },
      });

      if (result) {
        return res.status(200).json({
          status: true,
          message: result.length
            ? "Departent details fetched successfully"
            : "No records found",
          body: result,
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "No records found", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async deleteDepartmentDetails(req, res, next) {
    try {
      const result = await department_details.update(
        { isDeleted: 1 },
        { where: { id: req.params.id } }
      );

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Department deleted successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async addFaculty(path, req, res, next) {
    try {
      const payload = req.body;

      const insertData = {
        name: payload.name,
        age: payload.age,
        college_id: payload.college_id,
        experience: payload.experience,
        subject: payload.subject,
        address: payload.address,
        image: path,
        email_id: payload.email_id,
        contact: payload.contact,
      };

      const result = await faculty_details.create(insertData);

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Faculty created successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async editFaculty(path, req, res, next) {
    try {
      const payload = req.body;
      const upData = {
        name: payload.name,
        age: payload.age,
        college_id: payload.college_id,
        experience: payload.experience,
        subject: payload.subject,
        address: payload.address,
        image: path,
        email_id: payload.email_id,
        contact: payload.contact,
      };

      const result = await faculty_details.update(upData, {
        where: { id: payload.id, isDeleted: 0 }
      });

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Faculty updated successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async getAllFaculty(req, res, next) {
    try {
      const result = await faculty_details.findAll({
        where: { isDeleted: 0 },
      });

      if (result) {
        return res.status(200).json({
          status: true,
          message: result.length
            ? "Faculties fetched successfully"
            : "No records found",
          body: result,
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "No records found", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async deleteFaculty(req, res, next) {
    try {
      const result = await faculty_details.update(
        { isDeleted: 1 },
        { where: { id: req.params.id } }
      );

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Faculty deleted successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async addProgramDetails(req, res, next) {
    try {
      const payload = req.body;

      const insertData = {
        name: payload.name,
        college_id: payload.college_id,
        duration: payload.duration,
        session: payload.session,
      };

      const result = await program_details.create(insertData);

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Programs created successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async editProgramDetails(req, res, next) {
    try {
      const payload = req.body;

      const upData = {
        name: payload.name,
        college_id: payload.college_id,
        duration: payload.duration,
        session: payload.session,
      };

      const result = await program_details.update(upData, {
        where: { id: payload.id, isDeleted: 0 },
      });

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Programs updated successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async getAllProgramDetails(req, res, next) {
    try {
      const result = await program_details.findAll({
        where: { isDeleted: 0 },
      });

      if (result) {
        return res.status(200).json({
          status: true,
          message: result.length
            ? "Programs fetched successfully"
            : "No records found",
          body: result,
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "No records found", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async deleteProgramDetails(req, res, next) {
    try {
      const result = await program_details.update(
        { isDeleted: 1 },
        { where: { id: req.params.id } }
      );

      if (result) {
        return res.status(200).json({
          status: true,
          message: "Programs deleted successfully",
          body: [],
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Error", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async getDetailsByCollegeId(req, res, next) {
    try {
      let college_id = req.params.college_id;

      // const faculties = await sequelize.query(
      //   `SELECT * FROM faculty_details where isDeleted = 0 and college_id = ${college_id}`,
      //   { type: QueryTypes.SELECT }
      // );

const faculties = await faculty_details.findAll({where: {college_id: college_id, isDeleted: 0},raw: true});
const programs = await program_details.findAll({where: {college_id: college_id, isDeleted: 0},raw: true});

      // const programs = await sequelize.query(
      //   `SELECT * FROM program_details where isDeleted = 0 and college_id = ${college_id}`,
      //   { type: QueryTypes.SELECT }
      // );

      let finalresult = {
        faculties,
        programs,
      };

      if (finalresult) {
        return res.status(200).json({
          status: true,
          message: "Details Fetched successfully",
          body: finalresult,
        });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "No record Found", body: [] });
      }
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }

  async getStudentsByCollegeId(req, res, next) {
    try {
      const college_id = req.params.college_id;
  if(college_id){
    // const result = await sequelize.query(
    //   `select * from user_admission_details where college_id = ${college_id} and isDeleted = '0'`,
    //   { type: QueryTypes.SELECT }
    // );

const result= await admission_details.findAll({where: {college_id: college_id, isDeleted : 0},raw: true});

    // console.log('rrrrrrrrrrrrrrrrrrrrrrrr',result);

    // return
      if(result){
        return res.status(200).json({status: true, message: result.length ? "fetched successfully": "No data found.", body: result});
      }else{
        return res.status(500).json({status: false, message: "Error", body: []})
      }
  }else{


    const result= await admission_details.findAll({where: {isDeleted : 0},raw: true});
      if(result){
        return res.status(200).json({status: true, message: result.length ? "fetched successfully": "No data found.", body: result});
      }else{
        return res.status(500).json({status: false, message: "Error", body: []})
      }
  }
   
    } catch (error) {
      console.log("errrrrrrrrrrrrr", error);
      return res.status(500).json({ status: false, message: "error" });
    }
  }
}

module.exports = new AdminService();
