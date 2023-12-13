import District from '../models/districtModel.js';

// Thêm export đầu mỗi hàm
// Ở file cần dùng thì import * as [abcd]Service from 'path/[abcd]Service.js'

export const createDistrict = async (data) => {
    try {
		await District.create(data);
		return {message: 'District created successfully'};
	} catch (error) {
		throw new Error(`Error creating district: ${error.message}`);
	}
}

export const getDistrictByID = async (districtID) => {
    try {
        const district = await District.findOne({ districtID });
        // console.log(district);
        return district;
    } catch (error) {
        throw new Error(`Error getting district by ID: ${error.message}`);
    }
}

export const getAllDistricts = async () => {
    try {
        const districts = await District.find().sort({districtID: 1});
        return districts;
    } catch (error) {
        throw new Error(`Error getting all districts: ${error.message}`);
    }
}

export const updateDistrictByID = async (districtID, newData) => {
    try {
        await District.findOneAndUpdate(
            { districtID },
            { $set: newData },
        );
        return {message: 'District updated successfully'};
    } catch (error) {
        throw new Error(`Error updating district by ID: ${error.message}`);
    }
}

export const deleteDistrictByID = async (districtID) => {
    try {
        await District.findOneAndDelete({ districtID });
        return {message: 'Officer deleted successfully'};
    } catch (error) {
        throw new Error(`Error deleting district by ID: ${error.message}`);
    }
}
