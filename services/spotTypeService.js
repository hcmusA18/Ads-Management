import SpotType from '../models/spotTypeModel.js';

export const createSpotType = async (data) => {
  try {
    const newSpotType = new SpotType(data);
    await newSpotType.save();
    return { message: 'Spot type created successfully' };
  } catch (error) {
    throw new Error(`Error creating spot type: ${error.message}`);
  }
};

export const updateSpotTypeByID = async (typeID, newData) => {
  try {
    await SpotType.findOneAndUpdate(
      { typeID },
      { $set: newData },
    );
    return { message: 'Spot type updated successfully' };
  } catch (error) {
    throw new Error(`Error updating spot type by ID: ${error.message}`);
  }
};

export const deleteSpotTypeByID = async (typeID) => {
  try {
    await SpotType.findOneAndDelete({ typeID });
    return { message: 'Spot type deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting spot type by ID: ${error.message}`);
  }
};

export const getAllSpotTypes = async () => {
  try {
    const spotTypes = await SpotType.find();
    return spotTypes;
  } catch (error) {
    throw new Error(`Error getting all spot types: ${error.message}`);
  }
};

export const getSpotTypeByID = async (typeID) => {
  try {
    const spotType = await SpotType.findOne({ typeID });
    return spotType;
  } catch (error) {
    throw new Error(`Error getting spot type by ID: ${error.message}`);
  }
};
