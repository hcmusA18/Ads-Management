import Ward from '../models/wardModel.js'

// Thêm export đầu mỗi hàm
// Ở file cần dùng thì import * as [abcd]Service from 'path/[abcd]Service.js'

export const createWard = async (data) => {
  try {
    const newWard = new Ward(data)
    await newWard.save()
    return { message: 'Ward created successfully' }
  } catch (error) {
    throw new Error(`Error creating ward: ${error.message}`)
  }
}

export const getWardByID = async (wardID) => {
  try {
    const ward = await Ward.findOne({ wardID })
    return ward
  } catch (error) {
    throw new Error(`Error getting ward by ID: ${error.message}`)
  }
}

export const getAllWards = async () => {
  try {
    return await Ward.find()
  } catch (error) {
    throw new Error(`Error getting all wards: ${error.message}`)
  }
}

export const getWardsOfDistrict = async (districtID) => {
  try {
    return await Ward.find({ districtID })
  } catch (error) {
    throw new Error(`Error getting wards of district: ${error.message}`)
  }
}

export const updateWardByID = async (wardID, newData) => {
  try {
    await Ward.findOneAndUpdate({ wardID }, { $set: newData })
    return { message: 'Ward updated successfully' }
  } catch (error) {
    throw new Error(`Error updating ward by ID: ${error.message}`)
  }
}

export const deleteWardByID = async (wardID) => {
  try {
    await Ward.findOneAndDelete({ wardID })
    return { message: 'Ward deleted successfully' }
  } catch (error) {
    throw new Error(`Error deleting ward by ID: ${error.message}`)
  }
}

export const deleteWardsOfDistrict = async (districtID) => {
  try {
    await Ward.deleteMany({ districtID })
    return { message: 'Wards of district deleted successfully' }
  } catch (error) {
    throw new Error(`Error deleting wards of district: ${error.message}`)
  }
}

export const findWards = async (criteria) => {
  try {
    const wards = await Ward.findAll({ criteria });
    return wards;
  } catch (error) {
    throw new Error(`Error get wards of criteria: ${error.message}`)
  }
};

export const countAll = async () => {
  try {
    return Ward.countDocuments();
  } catch (error) {
    throw new Error(`Error get wards of count documents: ${error.message}`)
  }
}
