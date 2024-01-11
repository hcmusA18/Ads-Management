import District from '../models/districtModel.js';

// Thêm export đầu mỗi hàm
// Ở file cần dùng thì import * as [abcd]Service from 'path/[abcd]Service.js'

export const createDistrict = async (data) => {
  try {
    await District.create(data);
    return { message: 'District created successfully' };
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
    const districts = await District.find({}, { _id: 0, districtID: 1, districtName: 1 }).sort({ districtID: 1 });
    return districts;
  } catch (error) {
    throw new Error(`Error getting all districts: ${error.message}`);
  }
}

export const updateDistrictByID = async (districtID, newData) => {
  try {
    // console.log(districtID, newData);
    const res = await District.findOneAndUpdate(
      { districtID },
      { $set: newData },
      { new: true, useFindAndModify: false }
    );
    // console.log(res);
    if (res.districtID === districtID && res.districtName === newData.districtName)
      return { message: 'Cập nhật Quận thành công' };
    else
      throw new Error('Cập nhật Quận thất bại');
  } catch (error) {
    throw new Error(error.message);
  }
}

export const deleteDistrictByID = async (districtID) => {
  try {
    await District.findOneAndDelete({ districtID });
    return { message: 'Officer deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting district by ID: ${error.message}`);
  }
}

export const getIDByName = async (districtName) => {
  try {
    const district = await District.findOne({ districtName }, { _id: 0, districtID: 1 });
    
    if (!district) {
      return null;
    }
    return district.districtID;
  } catch (error) {
    throw new Error(`Error getting district ID by name: ${error.message}`);
  }
}
