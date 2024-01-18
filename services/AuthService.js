const SHA256 = require('crypto-js/sha256');

const commonConfig = require('../config/common.config');
const usersModel = require('../models/users');

// const otpModel = require('../models/userOtp');
const tokenService = require('./TokenService');
// const userOtp = require('../models/userOtp');
const sendOtpTOPhone = require('../common/twilioSms');
const sendOtpMail = require('../common/mailers/sendMail');

class AuthService {
	/** ***** User Service: Method to Signup User ******/
	async signup(req, res, next) {
		try {
			const result = await usersModel.findOne({where: {email: req.body.email}, raw: true});
			/**
			 * @ param object
			 */
			const payload = req.body;

			/** ** generated hashed password ****/

			const cipherText = SHA256(payload.password, commonConfig.PWD_SECRET).toString();
			/**
			 * @ param {string} fullName, user fullname
			 * @ param {string} email, user email
			 * @ param {string} password, user password
			 * @ param {string} phoneNumber, user phoneNumber
			 */
			const dataToCreate = {
				first_name: req.body.firstname,
				middle_name: req.body.middlename,
				last_name: req.body.lastname,
				username: req.body.username,
				email: req.body.email,
				password: cipherText,
				country: payload.country,
				phoneNumber: req.body.phoneNumber,
				role: payload.role,
				fcmToken: req.body.fcmToken ?? '',
			};

			if (result) {
				return res.status(403).json({status: false, message: 'Email already exists', result: {'email': payload.email}});
			} else {
				const data = await usersModel.create(dataToCreate);
				/** ** generate accessToken and refreshToken with email and id ****/
				const token = tokenService.generateTokens({email: dataToCreate.email, id: data.id});
				const response = {
					fullName: data.fullName,
					email: data.email,
					phoneNumber: data.phoneNumber,
					accessToken: token.accessToken,
					refreshToken: token.refreshToken,
					userId: data.id,
				};
				return res.status(200).json({status: true, message: 'User Registered Successfully', result: response});
			}
		} catch (error) {
			console.log("errorerrorerrorerror",error);
			return res.status(500).json({status: false, message: error});
		}
	}

	/** ***** User Service: Method to do login ******/
	async userLogin(req, res, next) {
		try {
			/**
			 * @ param {string} email, user email
			 * @ param {string} password, user password
			 */
			const payload = req.body;
			/** ** find user data with email ****/
			const data = await usersModel.findOne({where: {email: payload.email}, raw: true});
			if (data) {
				/** ** generate hashed password and compare with existing password ****/
				const cipherText = SHA256(req.body.password, commonConfig.PWD_SECRET).toString();
				if (cipherText === data.password) {
					/** ** generate accessToken and refreshToken with email and id ****/
					const token = tokenService.generateTokens({email: data.email, id: data.id, username: data.username});
					/** ** response object  ****/
					const response = {
						fullName: data.fullName,
						email: data.email,
						phoneNumber: data.phoneNumber,
						accessToken: token.accessToken,
						refreshToken: token.refreshToken,
						userId: data.id,
						profileImage: data.profileImage,
					};
					return res.status(200).json({status: true, message: 'Login Successfully', result: response});
				} else {
					return res.status(401).json({status: false, message: 'Incorrect Password'});
				}
			} else {
				return res.status(401).json({status: false, message: 'Email not found'});
			}
		} catch (error) {
			return res.status(500).json({status: false, message: error});
		}
	}

	async forgotPassword(req, res, next) {
		try {
			/**
			 * @ param {string} email, user email
			 * @ param {string} password, user password
			 */
			const OTP = Math.floor(1000 + Math.random() * 9000);

			const payload = req.body;
			/** ** find user data with email ****/
			payload.email ? payload.email : payload.phoneNumber;
			let data = '';
			if (payload.email) {
				data = await usersModel.findOne({where: {email: payload.email}, raw: true});
			} else if (payload.phoneNumber) {
				data = await usersModel.findOne({where: {phoneNumber: payload.phoneNumber}, raw: true});
			}
			if (data) {
				const ext = process.env.TWILIO_EXTENSION_NUMBER;
				const number = ext.concat(payload.phoneNumber);
				/** ** generate hashed password and compare with existing password ****/
				const otpData = await otpModel.findOne({where: {userId: data.id}, raw: true});

				if (otpData) {
					await otpModel.update({otp: OTP}, {where: {userId: data.id}});
					if (payload.phoneNumber) {
						/** sending sms with otp using twilio */
						await sendOtpTOPhone({number, OTP});
					}
					/** sending email with otp using nodemailer  */
					sendOtpMail({email: payload.email, OTP: OTP});
					const message = payload.email ? 'Email sent to registered email successfully' : 'Otp sent to registered number successfully';
					return res.status(200).json({status: true, message: message, result: {otp: OTP}});
				} else {
					const dataToCreate = {
						userId: data.id,
						otp: OTP,
					};
					await otpModel.create(dataToCreate);
					if (payload.phoneNumber) {
						/** sending sms with otp using twilio */
						await sendOtpTOPhone({number, OTP});
					}
					/** sending email with otp using nodemailer  */
					sendOtpMail({email: payload.email, OTP: OTP});

					const message = payload.email ? 'Email sent to registered email successfully' : 'Otp sent to registered number successfully';
					return res.status(200).json({status: true, message: message, result: {otp: OTP}});
				}
			} else {
				return res.status(401).json({status: false, message: payload.email ? 'Email not found' : 'Phone number not found'});
			}
		} catch (error) {
			return res.status(500).json({status: false, message: error});
		}
	}

	async verifyOtp(req, res, next) {
		try {
			/**
			 * @ param {string} otp, user otp
			 */
			const payload = req.body;
			// const data = await userOtp.findOne({where: {otp: payload.otp}, raw: true});
			// /** check for otp match with existing otp and payload otp is mathched or not*/
			// if (data.otp == payload.otp) {
			// 	return res.status(200).json({status: true, message: 'Otp Verified Successfully', result: {userId: data.userId}});
			// } else {
			// 	return res.status(401).json({status: false, message: 'Not Verified'});
			// }
		} catch (error) {
			return res.status(500).json({status: false, message: error});
		}
	}
}


module.exports = new AuthService();

