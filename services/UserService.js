const usersModel = require('../models/users');
// const collegeModel = require('../models/colleges')
// const userPreferencesModel = require('../models/userPropertyPreferences');
// const listingCategories = require('../models/listing_categories');
// const userPropertyList = require('../models/userPropertyList');
// const properties = require('../models/properties');
// const favoriteProperty = require('../models/favoriteProperties');
// const history = require('../models/history');
const SHA256 = require('crypto-js/sha256');
const commonConfig = require('../config/common.config');
const checkUnique = require('../helpers/checkUnique');

class UserService {
	/** ***** User Service: Method to get user profile Info******/
	async getUserProfile(req, res, next) {
		try {
			const result = await usersModel.findOne({attributes: {exclude: ['password', 'accessToken', 'refreshToken', 'status', 'isDeleted', 'createdAt', 'updatedAt']}, where: {id: req.decoded.id}, raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'User Profile', result: result});
			} else {
				return res.status(200).json({status: false, message: 'User details not found'});
			}
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}
	async changePassword(req, res, next) {
		try {
			const payload = req.body;
			const result = await usersModel.findOne({where: {id: payload.userId}, raw: true});
			if (result) {
				/** ** generate hashed password and compare with existing password ****/
				const cipherText = SHA256(req.body.currentPassword, commonConfig.PWD_SECRET).toString();
				if (cipherText === result.password) {
					/** ** generate hash for newPassword ****/
					const newPassword = SHA256(payload.newPassword, commonConfig.PWD_SECRET).toString();

					await usersModel.update({password: newPassword}, {where: {id: payload.userId}});
					return res.status(200).json({status: true, message: 'Password Changed'});
				} else {
					return res.status(404).json({status: false, message: 'Incorrect Password'});
				}
			} else {
				return res.status(404).json({status: false, message: 'Not found'});
			}
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}
	async resetPassword(req, res, next) {
		try {
			const payload = req.body;
			/** find user details with userId */
			const result = await usersModel.findOne({where: {id: payload.userId}, raw: true});
			if (result) {
				/** check for password and confirm passwords are matched or not*/
				if (payload.password == payload.confirmPassword) {
					const cipherText = SHA256(payload.password, commonConfig.PWD_SECRET).toString();
					/** check for password and confirm passwords are matched or not*/
					if (cipherText === result.password) {
						return res.status(402).json({status: false, message: 'Password must be different'});
					} else {
						const Password = SHA256(payload.password, commonConfig.PWD_SECRET).toString();
						await usersModel.update({password: Password}, {where: {id: payload.userId}});
						return res.status(200).json({status: true, message: 'Password Changed'});
					}
				} else {
					return res.status(404).json({status: false, message: 'Password and Confirm Password must be match.'});
				}
				/** ** generate hashed password ****/
			} else {
				return res.status(404).json({status: false, message: 'Not found'});
			}
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	async editProfile(req, res, next) {
		try {
			/** req.body object */
			let payload = req.body;
			const userId = req.decoded.id;
			payload.id = userId;
			/** calls checkUniqueEmail function and send a callback */
			checkUnique.checkUniqueEmail(payload, async function(callbackres) {
				if (callbackres == false) {
					/** callback return false for match Email */
					return res.status(200).json({status: false, message: 'Email Already Exist'});
				} else {
					/** calls checkUniquePhone function and send a callback */
					checkUnique.checkUniquePhone(payload, async function(callbackres) {
						if (callbackres == false) {
							/** callback return false for match Phone number */
							return res.status(200).json({status: false, message: 'Phone number Already Exist'});
						} else {
							/**  object data for edit fields*/
							const dataToUpdate = {
								fullName: payload.fullName,
								email: payload.email,
								phoneNumber: payload.phoneNumber,
							};
							/** sequelize update  */
							await usersModel.update(dataToUpdate, {where: {id: userId}});
							return res.status(200).json({status: true, message: 'Profile Updated'});
						}
					});
				}
			});
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}
	async getFilters(req, res, next) {
		try {
			const userId = req.decoded.id;
			const usersFilters = await userPreferencesModel.findOne({where: {userId: userId}, raw: true});
			if (usersFilters) {
				/** ** obj response object ****/
				const respData = {
					userId: usersFilters.userId,
					propertyType: usersFilters.propertyType,
					latitude: usersFilters.latitude,
					longitude: usersFilters.longitude,
					lowPriceRange: usersFilters.priceMin,
					upperPriceRange: usersFilters.priceMax,
					bedRooms: usersFilters.bedroom,
					bathrooms: usersFilters.bathroom,
					storyMax: usersFilters.storyMax,
					storyMin: usersFilters.storyMin,
					pooles: 0,
				};
				return res.status(200).json({status: true, message: 'Property filters', result: respData});
			} else {
				return res.status(404).json({status: false, message: 'Filters Not found'});
			}
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}
	async updateUserFilters(req, res, next) {
		try {
			const userId = req.decoded.id;
			const payload = req.body;
			/** object for update data */
			const objToUpdate = {
				propertyType: payload.propertyType,
				latitude: payload.latitude,
				longitude: payload.longitude,
				priceMin: payload.lowPriceRange,
				priceMax: payload.upperPriceRange,
				bedroom: payload.bedRooms,
				bathroom: payload.bathrooms,
				storyMax: payload.storyMax,
				storyMin: payload.storyMin,
				pools: payload.pools,
			};
			await userPreferencesModel.update(objToUpdate, {where: {userId: userId}});
			return res.status(200).json({status: true, message: 'User Property filters Updated'});
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}
	async createPropertylist(req, res, next) {
		try {
			const userId = req.decoded.id;
			const payload = req.body;
			/** object for create list data */
			const dataToCreate = {
				listName: payload.listName,
				userId: userId,
			};
			/** check for duplicate entry for list name */
			const duplicateList = await listingCategories.findOne({where: {listName: payload.listName}});
			/** if duplicate entry found */
			if (duplicateList) {
				return res.status(200).json({status: false, message: `List With ${payload.listName} name is already exist `});
			} else {
				const result = await listingCategories.create(dataToCreate);
				if (result) {
					const result = await listingCategories.findAll({
						/** get listed data, properties count by reference mentioned in model */
						include: [
							{
								model: userPropertyList,
							}],
						where: {userId: userId},
						order: [
							['createdAt', 'DESC'],
						],
					});
					const dataArray = [];

					result.forEach((item) => {
						/**  response object */
						const obj = {
							'title': item.listName,
							'id': item.id,
							'noOfProperties': item.user_property_lists.length,
						};
						dataArray.push(obj);
					});
					return res.status(200).json({status: true, message: 'Property List Created', result: dataArray});
				} else {
					return res.status(404).json({status: false, message: 'Something wrong'});
				}
			}
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}
	async getPropertyList(req, res, next) {
		try {
			const userId = req.decoded.id;
			/** find all list of users with its no pf properties */
			const result = await listingCategories.findAll({
				/** get listed data, properties count by reference mentioned in model */
				include: [
					{
						model: userPropertyList,
					}],
				where: {userId: userId},
			});
			const dataArray = [];
			result.forEach((item) => {
				/**  response object */
				const obj = {
					'title': item.listName,
					'id': item.id,
					'noOfProperties': item.user_property_lists.length,
				};
				dataArray.push(obj);
			});
			return res.status(200).json({status: true, message: 'Categories List', result: dataArray});
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}
	async addPropertyToList(req, res, next) {
		try {
			const payload = req.body;
			/** object for create list */
			const objToCreate = {
				'listId': payload.listId,
				'propertyId': payload.property_id,
			};
			await userPropertyList.create(objToCreate);
			return res.status(200).json({status: true, message: 'success'});
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}
	async userPropertiesByListId(req, res, next) {
		try {
			const payload = req.query;

			/** find all properties by list id*/
			const result = await userPropertyList.findAll({
				/** get property data by reference mentioned in model */
				include: [
					{
						model: properties,
					}],
				where: {listId: payload.listId},
			});
			/* array for show properties of user which are added in */
			const dataArray = [];
			result.forEach((item) => {
				dataArray.push(item.property);
			});
			return res.status(200).json({status: true, message: 'User Properties by List', result: dataArray});
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}
	async addFavoriteProperty(req, res, next) {
		try {
			const payload = req.body;
			/** object for create favorite property  data */
			const objToCreate = {
				userId: req.decoded.id,
				propertyId: payload.propertyId,
			};
			/** check for duplicat, if property already added to favorite */
			const duplicateFavoriteProperty = await favoriteProperty.findOne({where: {propertyId: payload.propertyId}});
			/** if found duplicate */
			if (duplicateFavoriteProperty) {
				return res.status(200).json({status: false, message: 'Property already added to favorite'});
			} else {
				await favoriteProperty.create(objToCreate);
				return res.status(200).json({status: true, message: 'Favorite Property Created'});
			}
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}
	async userFavoriteProperties(req, res, next) {
		try {
			const userId = req.decoded.id;
			/** find all favorite properties */
			const result = await favoriteProperty.findAll({
				/** get property data by reference mentioned in model */
				include: [
					{
						model: properties,
					}],
				where: {userId: userId},
			});
			const dataArray = [];

			result.forEach((item) => {
				dataArray.push(item.property);
			});
			return res.status(200).json({status: true, message: 'Favorite Properties List', result: dataArray});
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}
	async addHistory(req, res, next) {
		try {
			const payload = req.body;
			/** object for create favorite property  data */
			const objToCreate = {
				userId: req.decoded.id,
				propertyId: payload.propertyId,
			};

			await history.create(objToCreate);
			return res.status(200).json({status: true, message: 'History Created'});
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}
	async getHistory(req, res, next) {
		try {
			const userId = req.decoded.id;
			/** find all favorite properties */
			const result = await history.findAll({
				/** get property data by reference mentioned in model */
				include: [
					{
						model: properties,
					}],
				where: {userId: userId},
			});
			const dataArray = [];

			result.forEach((item) => {
				dataArray.push(item.property);
			});
			return res.status(200).json({status: true, message: 'history', result: dataArray});
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}




}
module.exports = new UserService();


