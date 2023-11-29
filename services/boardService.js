import Board from '../models/boardModel.js';

// Thêm export đầu mỗi hàm
// Ở file cần dùng thì import * as [abcd]Service from 'path/[abcd]Service.js'

export const createBoard = async (data) => {
  try {
    const newBoard = new Board(data);
    await newBoard.save();
    return { message: 'Board created successfully' };
  } catch (error) {
    throw new Error(`Error creating board: ${error.message}`);
  }
};

export const updateBoardByID = async (boardID, newData) => {
  try {
    await Board.findOneAndUpdate(
      { boardID },
      { $set: newData },
    );
    return { message: 'Board updated successfully' };
  } catch (error) {
    throw new Error(`Error updating board by ID: ${error.message}`);
  }
};

export const deleteBoardByID = async (boardID) => {
  try {
    await Board.findOneAndDelete({ boardID });
    return { message: 'Board deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting board by ID: ${error.message}`);
  }
};

export const getAllBoards = async () => {
  try {
    const boards = await Board.find();
    return boards;
  } catch (error) {
    throw new Error(`Error getting all boards: ${error.message}`);
  }
};

export const getBoardByID = async (boardID) => {
  try {
    const board = await Board.findOne({ boardID });
    return board;
  } catch (error) {
    throw new Error(`Error getting board by ID: ${error.message}`);
  }
};

export const getBoardsOfSpot = async (spotID) => {
  try {
    const boards = await Board.find({ spotID });
    return boards;
  } catch (error) {
    throw new Error(`Error getting boards of spot: ${error.message}`);
  }
};


export const countAll = async () => {
  try {
    return Board.countDocuments();
  } catch (error) {
    throw new Error(`Error couting boards of spot: ${error.message}`);
  }
};

export const countAllOfDistrict = async (districtID) => {
  try {
    return Board.countDocuments({districtID: districtID});
  } catch (error) {
    throw new Error(`Error get wards of count documents: ${error.message}`)
  }
}