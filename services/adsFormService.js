import AdsForm from '../models/adsFormModel.js';

// Thêm export đầu mỗi hàm
// Ở file cần dùng thì import * as [abcd]Service from 'path/[abcd]Service.js'

export const create = async (data) => {
  try {
    const newAdsForm = new AdsForm(data);
    await newAdsForm.save();
    return { message: 'Ads form created successfully' };
  } catch (error) {
    throw new Error(`Error creating ads form: ${error.message}`);
  }
};

export const updateAdsFormByID = async (formID, newData) => {
  try {
    await AdsForm.findOneAndUpdate(
      { formID },
      { $set: newData },
    );
    return { message: 'Ads form updated successfully' };
  } catch (error) {
    throw new Error(`Error updating ads form by ID: ${error.message}`);
  }
};

export const remove = async (formID) => {
  try {
    await AdsForm.findOneAndDelete({ formID });
    return { message: 'Ads form deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting ads form by ID: ${error.message}`);
  }
};

export const getAllAdsForms = async () => {
  try {
    return await AdsForm.find();
  } catch (error) {
    throw new Error(`Error getting all ads forms: ${error.message}`);
  }
};

export const getAdsFormByID = async (formID) => {
  try {
    const adsForm = await AdsForm.findOne({ formID });
    return adsForm;
  } catch (error) {
    throw new Error(`Error getting ads form by ID: ${error.message}`);
  }
};
