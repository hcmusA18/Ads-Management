import e from 'cors';
import Officer from '../models/officerModel.js';
import {hashPassword} from './passwordService.js';
import {Model} from 'mongoose';
import officerModel from "../models/officerModel.js";

export const createOfficer = async (data) => {
	// hash password
	data.password = await hashPassword(data.password);
	try {
		await Officer.create(data);
		return {message: 'Officer created successfully'};
	} catch (error) {
		throw new Error(`Error creating officer: ${error.message}`);
	}
};

export const updatePasswordByUsername = async (username, newPassword) => {
	try {
		await Officer.findOneAndUpdate({username}, {$set: {password: newPassword}});
		return {message: 'Password updated successfully'};
	} catch (error) {
		throw new Error(`Error updating password: ${error.message}`);
	}
};

export const deleteOfficerByUsername = async (username) => {
	try {
		await Officer.findOneAndDelete({username});
		return {message: 'Officer deleted successfully'};
	} catch (error) {
		throw new Error(`Error deleting officer: ${error.message}`);
	}
};

export const getOfficerByUsername = async (username) => {
	try {
		return Officer.findOne({username});
	}	catch (error) {
		throw new Error(`Error getting officer ${username}: ${error.message}`);
	}
};

// 1:  for district officer
// 2:  for ward officer
// 0 is not assigned
// -1 get all
export const getAllOfficersByPosition = async (position = -1) => {
	const options = [
		{
			$match: {
				username: {$ne: 'admin'},
				position: {$ne: -1}
			}
		},
		{
			$lookup: {
				from: 'districts',
				localField: 'districtID',
				foreignField: 'districtID',
				as: 'district',
			}
		},
		{
			$lookup: {
				from: 'wards',
				localField: 'wardID',
				foreignField: 'wardID',
				as: 'ward',
			}
		},
		{
			$unwind: {
				path: '$district',
				preserveNullAndEmptyArrays: true
			},
		},
		{
			$unwind: {
				path: '$ward',
				preserveNullAndEmptyArrays: true
			},
		},
		{
			$project: {
				_id: 0,
				username: 1,
				email: 1,
				position: 1,
				districtID: 1,
				wardID: 1,
				districtName: '$district.districtName',
				wardName: '$ward.wardName'
			}
		}
	];
	try {
		if (position === -1) {
			return await Officer.aggregate(options);
		}
		else if (position < 3) {
			const matchOptions = {position};
			return await Officer.aggregate([...options, {$match: matchOptions}]);
		}
		else throw new Error('Invalid position');
	}
	catch (error) {
		throw new Error(`Error getting officers ${position}: ${error.message}`);
	}
};

export const getOfficersByDistrictID = async (districtID) => {
	try {
		return await Officer.find({districtID});
	} catch (error) {
		throw new Error(`Error getting officers ${districtID}: ${error.message}`);
	}
};

export const getOfficersByWardID = async (wardID) => {
	try {
		return await Officer.find({wardID});
	} catch (error) {
		throw new Error(`Error getting officers ${wardID}: ${error.message}`);
	}
};

export const getOfficerByGoogleID = async (googleId) => {
	try {
		return await Officer.findOne({googleId});
	} catch (error) {
		throw new Error(`Error getting officer ${googleId}: ${error.message}`);
	}
};

export const updateOfficer = async (username, dataToUpdate) => {
	try {
		await Officer.findOneAndUpdate({ username }, { $set: dataToUpdate });
		return { message: 'Officer updated successfully' };
	} catch (error) {
		throw new Error(`Error updating officer ${username}: ${error.message}`);
	}
};

export default {
	createOfficer,
	deleteOfficerByUsername,
	getAllOfficersByPosition,
	getOfficerByGoogleID,
	getOfficerByUsername,
	getOfficersByDistrictID,
	getOfficersByWardID,
	updatePasswordByUsername,
	updateOfficer
}