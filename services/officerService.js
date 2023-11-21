import Officer from '../models/officerModel.js';

export const createOfficer = async (data) => {
  try {
    const newOfficer = new Officer(data);
    await newOfficer.save();
    return { message: 'Officer created successfully' };
  } catch (error) {
    throw new Error(`Error creating officer: ${error.message}`);
  }
};

export const updatePasswordByUsername = async (username, newPassword) => {
  try {
    await Officer.findOneAndUpdate(
      { username },
      { $set: { password: newPassword } },
    );
    return { message: 'Password updated successfully' };
  } catch (error) {
    throw new Error(`Error updating password by username: ${error.message}`);
  }
};

export const deleteOfficerByUsername = async (username) => {
  try {
    await Officer.findOneAndDelete({ username });
    return { message: 'Officer deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting officer by username: ${error.message}`);
  }
};

export const getOfficerByUsername = async (username) => {
  try {
    const officer = await Officer.findOne({ username });
    return officer;
  } catch (error) {
    throw new Error(`Error getting officer by username: ${error.message}`);
  }
};

// 1: cho cán bộ Quận, 2 cho cán bộ Phường
// 0 cho tài khoản chưa được cấp quyền
// -1 để generate toàn bộ tài khoản
export const getAllOfficersByPosition = async (position) => {
  try {
    let officers;
    if(position == -1){
        officers = await Officer.find();
    }
    else{
        officers = await Officer.find({ position });
    }
    return officers;
  } catch (error) {
    throw new Error(`Error getting officers by position: ${error.message}`);
  }
};

export const getOfficersByDistrictID = async (districtID) => {
  try {
    const officers = await Officer.find({ districtID });
    return officers;
  } catch (error) {
    throw new Error(`Error getting officers by districtID: ${error.message}`);
  }
};

export const getOfficersByWardID = async (wardID) => {
  try {
    const officers = await Officer.find({ wardID });
    return officers;
  } catch (error) {
    throw new Error(`Error getting officers by wardID: ${error.message}`);
  }
};

export const getOfficerByGoogleID = async (googleId) => {
  try {
    const officers = await Officer.findOne({ googleId: googleId });
    return officers;
  } catch (error) {
    throw new Error(`Error getting officers by GoogleID: ${error.message}`);
  }
};
