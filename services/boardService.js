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
    const options = [
      {
        $lookup: {
          from: 'boardtypes',
          localField: 'boardType',
          foreignField: 'typeID',
          as: 'boardtypes',
        }
      },
      {
        $unwind: {
          path: '$boardtypes',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'spots',
          localField: 'spotID',
          foreignField: 'spotID',
          as: 'spot',
        }
      },
      {
        $unwind: {
          path: '$spot',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'districts',
          localField: 'spot.districtID',
          foreignField: 'districtID',
          as: 'district',
        }
      },
      {
        $unwind: {
          path: '$district',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'wards',
          localField: 'spot.wardID',
          foreignField: 'wardID',
          as: 'ward',
        }
      },
      {
        $unwind: {
          path: '$ward',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'boardtypes',
          localField: 'boardType',
          foreignField: 'typeID',
          as: 'boardtypes',
        }
      },
      {
        $unwind: {
          path: '$boardtypes',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 0,
          boardID: 1,
          spotID: 1,
          spotName: '$spot.spotName',
          districtID: '$spot.districtID',
          districtName: '$district.districtName',
          wardID: '$spot.wardID',
          wardName: '$ward.wardName',
          boardType: 1,
          boardTypeName: '$boardtypes.typeName',
          height: 1,
          width: 1,
        }
      }
    ];

    const boards = await Board.aggregate(options);
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

export const countBySpot = async (spotID) => {
  try {
    return Board.countDocuments({spotID: spotID});
  } catch (error) {
    throw new Error(`Error get wards of count documents: ${error.message}`)
  }
}