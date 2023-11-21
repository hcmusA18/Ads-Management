import BoardType from '../models/boardTypeModel.js';

export const createBoardType = async (data) => {
  try {
    const newBoardType = new BoardType(data);
    await newBoardType.save();
    return { message: 'Board type created successfully' };
  } catch (error) {
    throw new Error(`Error creating board type: ${error.message}`);
  }
};

export const updateBoardTypeByID = async (typeID, newData) => {
  try {
    await BoardType.findOneAndUpdate(
      { typeID },
      { $set: newData },
    );
    return { message: 'Board type updated successfully' };
  } catch (error) {
    throw new Error(`Error updating board type by ID: ${error.message}`);
  }
};

export const deleteBoardTypeByID = async (typeID) => {
  try {
    await BoardType.findOneAndDelete({ typeID });
    return { message: 'Board type deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting board type by ID: ${error.message}`);
  }
};

export const getAllBoardTypes = async () => {
  try {
    const boardTypes = await BoardType.find();
    return boardTypes;
  } catch (error) {
    throw new Error(`Error getting all board types: ${error.message}`);
  }
};

export const getBoardTypeByID = async (typeID) => {
  try {
    const boardType = await BoardType.findOne({ typeID });
    return boardType;
  } catch (error) {
    throw new Error(`Error getting board type by ID: ${error.message}`);
  }
};
