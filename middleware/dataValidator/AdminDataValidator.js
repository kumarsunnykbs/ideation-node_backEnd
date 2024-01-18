const Yup = require('yup');
const commonConstants = require('../../constants/constant');

class AdminDataValidator {

    addColleges(req, res, next) {
		const schema = Yup.object().shape({
			name: Yup.string().trim().required('Name is required').min(3, 'Name should be atleast 3 characters').max(30, 'Name should max 30 characters'),
			email: Yup.string().trim().required('Email is required').email('Invalid Email'),
            contact: Yup.string().trim().required('Contact Number is required').matches(commonConstants.PHONE_REGEXP, 'Applicant Phone number is not valid'),
            websitelink: Yup.string().trim().required('Website Link is required'),
            city: Yup.string().trim().required('City is required'),
            state: Yup.string().trim().required('State is required'),
            country: Yup.string().trim().required('Country is required'),
            Established_Date: Yup.string().trim().required('Established Date is required')
           
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}

    editColleges(req, res, next) {
		const schema = Yup.object().shape({
			name: Yup.string().trim().required('Name is required').min(3, 'Name should be atleast 3 characters').max(30, 'Name should max 30 characters'),
			email: Yup.string().trim().required('Email is required').email('Invalid Email'),
            contact: Yup.string().trim().required('Contact Number is required').matches(commonConstants.PHONE_REGEXP, 'Applicant Phone number is not valid'),
            websitelink: Yup.string().trim().required('Website Link is required'),
            city: Yup.string().trim().required('City is required'),
            state: Yup.string().trim().required('State is required'),
            country: Yup.string().trim().required('Country is required'),
            Established_Date: Yup.string().trim().required('Established Date is required'),
            
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}
    deleteCollege(req, res, next) {
		const schema = Yup.object().shape({
            id: Yup.string().trim().required('Id is required')
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}
    getCollegeById(req, res, next) {
		const schema = Yup.object().shape({
            id: Yup.string().trim().required('Id is required'),
		});
		schema.validate(req.params, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}


    addCourses(req, res, next) {
		const schema = Yup.object().shape({
            college_id: Yup.string().trim().required('College Id is required.'),
			name: Yup.string().trim().required('Name is required').min(3, 'Name should be atleast 3 characters').max(30, 'Name should max 30 characters'),
			description: Yup.string().trim().required('Description is required'),
            course_duration: Yup.string().trim().required('Course Duration is required'),
            course_fee: Yup.string().trim().required('Course Fee is required'),
            course_startdate: Yup.string().trim().required('Course Startdate is required'),
            course_price: Yup.string().trim().required('Course Price is required'),
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}
    addAdmissionDetails(req, res, next) {
		const schema = Yup.object().shape({
            college_id: Yup.string().trim().required('College Id is required.'),
			name_of_applicant: Yup.string().trim().required('Name of Applicant is required').min(3, 'Name of Applicant should be atleast 3 characters').max(30, 'Name of Applicant should max 30 characters'),
			guardian_name: Yup.string().trim().required('Guardian Name is required').min(3, 'Guardian Name should be atleast 3 characters').max(30, 'Guardian Name should max 30 characters'),
            guardian_occupation: Yup.string().trim().required('Guardian Occupation is required'),
            date_of_birth: Yup.string().trim().required('Date of Birth is required'),
            permanent_address: Yup.string().trim().required('Permanent Address is required'),
            correspondence_address: Yup.string().trim().required('Correspondence Address is required'),
            applicant_phone: Yup.string().trim().required('Applicant Phone is required').matches(commonConstants.PHONE_REGEXP, 'Applicant Phone number is not valid'),
            guardian_phone: Yup.string().trim().required('Guardian Phone is required').matches(commonConstants.PHONE_REGEXP, 'Guardian Phone number is not valid'),
            academic_qualification: Yup.string().trim().required('Academic Qualification is required'),
			select_program: Yup.string().trim().required('Select Program is required')
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}

    editAdmissionDetails(req, res, next) {
		const schema = Yup.object().shape({
            id: Yup.string().trim().required('Id is required.'),
            college_id: Yup.string().trim().required('College Id is required.'),
			name_of_applicant: Yup.string().trim().required('Name of Applicant is required').min(3, 'Name of Applicant should be atleast 3 characters').max(30, 'Name of Applicant should max 30 characters'),
			guardian_name: Yup.string().trim().required('Guardian Name is required').min(3, 'Guardian Name should be atleast 3 characters').max(30, 'Guardian Name should max 30 characters'),
            guardian_occupation: Yup.string().trim().required('Guardian Occupation is required'),
            date_of_birth: Yup.string().trim().required('Date of Birth is required'),
            permanent_address: Yup.string().trim().required('Permanent Address is required'),
            correspondence_address: Yup.string().trim().required('Correspondence Address is required'),
            applicant_phone: Yup.string().trim().required('Applicant Phone is required').matches(commonConstants.PHONE_REGEXP, 'Applicant Phone number is not valid'),
            guardian_phone: Yup.string().trim().required('Guardian Phone is required').matches(commonConstants.PHONE_REGEXP, 'Guardian Phone number is not valid'),
            academic_qualification: Yup.string().trim().required('Academic Qualification is required'),
			select_program: Yup.string().trim().required('Select Program is required')
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}


	addDepartment(req, res, next) {
		const schema = Yup.object().shape({
            description: Yup.string().trim().required('Description is required.'),
			name: Yup.string().trim().required('Name is required').min(3, 'Name should be atleast 3 characters').max(30, 'Name should max 30 characters'),
			head: Yup.string().trim().required('Department head is required'),
            contact: Yup.string().trim().required('Contact Information is required'),
            faculties: Yup.string().trim().required('Faculties are required'),
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}


	editDepartment(req, res, next) {
		const schema = Yup.object().shape({
			id: Yup.string().trim().required('Id is required.'),
            description: Yup.string().trim().required('Description is required.'),
			name: Yup.string().trim().required('Name is required').min(3, 'Name should be atleast 3 characters').max(30, 'Name should max 30 characters'),
			head: Yup.string().trim().required('Department head is required'),
            contact: Yup.string().trim().required('Contact Information is required'),
            faculties: Yup.string().trim().required('Faculties are required'),
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}

	addFaculty(req, res, next) {
		const schema = Yup.object().shape({
			name: Yup.string().trim().required('Name is required').min(3, 'Name should be atleast 3 characters').max(30, 'Name should max 30 characters'),
			age: Yup.string().trim().required('Age is required.'),
            college_id: Yup.string().trim().required('College Id is required.'),
			experience: Yup.string().trim().required('Experience is required'),
            subject: Yup.string().trim().required('Subject is required'),
            address: Yup.string().trim().required('Address are required'),
            email_id: Yup.string().trim().required('Email Id are required'),
            contact: Yup.string().trim().required('Contact is required')
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}


	editFaculty(req, res, next) {
		const schema = Yup.object().shape({
			id: Yup.string().trim().required('Id is required'),
			name: Yup.string().trim().required('Name is required').min(3, 'Name should be atleast 3 characters').max(30, 'Name should max 30 characters'),
			age: Yup.string().trim().required('Age is required.'),
            college_id: Yup.string().trim().required('College Id is required.'),
			experience: Yup.string().trim().required('Experience is required'),
            subject: Yup.string().trim().required('Subject is required'),
            address: Yup.string().trim().required('Address are required'),
            email_id: Yup.string().trim().required('Email Id are required'),
            contact: Yup.string().trim().required('Contact is required')
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}

	addProgram(req, res, next) {
		const schema = Yup.object().shape({
			name: Yup.string().trim().required('Name is required').min(3, 'Name should be atleast 3 characters').max(30, 'Name should max 30 characters'),
			college_id: Yup.string().trim().required('College Id is required'),
			duration: Yup.string().trim().required('Duration is required.'),
            session: Yup.string().trim().required('Session is required.')
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}

	editProgram(req, res, next) {
		const schema = Yup.object().shape({
			id: Yup.string().trim().required('Id is required'),
			name: Yup.string().trim().required('Name is required').min(3, 'Name should be atleast 3 characters').max(30, 'Name should max 30 characters'),
			college_id: Yup.string().trim().required('College Id is required'),
			duration: Yup.string().trim().required('Duration is required.'),
            session: Yup.string().trim().required('Session is required.')
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}
}

module.exports = new AdminDataValidator();
