import e from 'cors';
import Officer from '../models/officerModel.js';
import {hashPassword} from './passwordService.js';
import {Model} from 'mongoose';

const handleAsyncError = async (promise) => {
	try {
		const result = await promise;
		return {result};
	} catch (error) {
		throw new Error(`Error: ${error.message}`);
	}
}

export const createOfficer = async (data) => {
	// hash password
	data.password = await hashPassword(data.password);
	return handleAsyncError(new Officer(data).save());
};

export const updatePasswordByUsername = async (username, newPassword) => {
	return handleAsyncError(Officer.findOneAndUpdate({username}, {$set: {password: newPassword}}));
};

export const deleteOfficerByUsername = async (username) => {
	return handleAsyncError(Officer.findOneAndDelete({username}));
};

export const getOfficerByUsername = async (username) => {
	return handleAsyncError(Officer.findOne({username}));
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
	if (position === -1) {
		return handleAsyncError(Officer.aggregate(options));
	} else if (position < 3) {
		const matchOptions = {position};
		return handleAsyncError(Officer.aggregate([...options, {$match: matchOptions}]));
	}
	else throw new Error('Invalid position');
};

export const getOfficersByDistrictID = async (districtID) => {
	return handleAsyncError(Officer.find({districtID}));
};

export const getOfficersByWardID = async (wardID) => {
	return handleAsyncError(Officer.find({wardID}));
};

export const getOfficerByGoogleID = async (googleId) => {
	return handleAsyncError(Officer.findOne({googleId}));
};

export const updateOfficer = async (username, dataToUpdate) => {
	// console.log(username);
	// console.log(dataToUpdate);
	try {
		await Officer.findOneAndUpdate({ username }, { $set: dataToUpdate });
	} catch (error) {
		throw new Error(error);
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