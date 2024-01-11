import Board from '../models/boardModel.js';
import mongoose from 'mongoose';

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
    const isReferenced = await Promise.all([
      Object.values(mongoose.models)
      .filter((model) => model.modelName !== 'boards')
      .map(async (model) => {
        if (model.schema.paths.boardID) {
          return await model.exists({ boardID });
        }
        return null;
      })
    ])

    if (isReferenced.some((value) => value)) {
      // return { message: 'Bảng quảng cáo này đang được sử dụng' };
      throw new Error('Bảng quảng cáo này đang được sử dụng');
    }

    await Board.findOneAndDelete({ boardID });
    return { message: 'Xóa bảng thành công' };
  } catch (error) {
    throw new Error(`${error.message}`);
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
          quantity: 1,
        }
      },
      {
        $sort: {
          boardID: 1, // 1 for ascending, -1 for descending
        },
      },
    ];

    const boards = await Board.aggregate(options);
    return boards;
  } catch (error) {
    throw new Error(`Error getting all boards: ${error.message}`);
  }
};

export const getBoardByID = async (boardID) => {
  try {
    const options = [
      {
        $match: {
          boardID: boardID,
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
        $lookup: {
          from: 'licensingrequests',
          localField: 'licensingID',
          foreignField: 'requestID',
          as: 'licensereq',
        }
      },
      {
        $lookup: {
          from: 'boardtypes',
          localField: 'boardType',
          foreignField: 'typeID',
          as: 'boardtype',
        }
      },
      {
        $lookup: {
          from: 'spottypes',
          localField: 'spot.spotType',
          foreignField: 'typeID',
          as: 'spottype',
        }
      },
      {
        $lookup: {
          from: 'adsforms',
          localField: 'spot.adsForm',
          foreignField: 'formID',
          as: 'adsform',
        }
      },
      {
        $unwind: {
          path: '$spot',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$licensereq',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$boardtype',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$spottype',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$adsform',
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
        $project: {
          boardID: 1,
          spotID: 1,
          spotName: '$spot.spotName',
          spotAddress: '$spot.address',
          authCompany: '$licensereq.companyName',
          authCompanyPhone: '$licensereq.companyPhone',
          authCompanyEmail: '$licensereq.companyEmail',
          authCompanyAddress: '$licensereq.companyAddress',
          startDate: '$licensereq.startDate',
          endDate: '$licensereq.endDate',
          boardType: 1,
          boardTypeName: '$boardtype.typeName',
          quantity: 1,
          height: 1,
          width: 1,
          spotType: '$spot.typeID',
          spotTypeName: '$spottype.typeName',
          adsForm: '$adsform.formID',
          adsFormName: '$adsform.formName',
          image: 1,
          licensingID: 1,
          content: '$licensereq.content',
          districtName: '$district.districtName',
          wardName: '$ward.wardName',
        }
      }
    ]
    const board = await Board.aggregate(options);
    return board[0];
  } catch (error) {
    throw new Error(`Error getting board by ID: ${error.message}`);
  }
};

export const getBoardsOfSpot = async (spotID) => {
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
        $match: {
          spotID: spotID,
        }
      },
      {
        $project: {
          _id: 0,
          boardID: 1,
          spotID: 1,
          boardType: 1,
          boardTypeName: '$boardtypes.typeName',
          height: 1,
          width: 1,
          quantity: 1,
        }
      }
    ]
    const boards = await Board.aggregate(options);
    return boards;
  } catch (error) {
    throw new Error(`Error getting boards of spot: ${error.message}`);
  }
};

export const getBoardsByDistrictID = async (districtID) => {
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
        $match: {
          'spot.districtID': districtID,
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
          wardID: '$spot.wardID',
          wardName: '$ward.wardName',
          boardType: 1,
          boardTypeName: '$boardtypes.typeName',
          height: 1,
          width: 1,
          quantity: 1,
        }
      }
    ];
    return await Board.aggregate(options);
  } catch (error) {
    throw new Error(`Error getting spots by districtID: ${error.message}`)
  }
}

export const getBoardsByWardID = async (wardID) => {
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
        $match: {
          'spot.wardID': wardID,
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
          wardID: '$spot.wardID',
          wardName: '$ward.wardName',
          boardType: 1,
          boardTypeName: '$boardtypes.typeName',
          height: 1,
          width: 1,
          quantity: 1,
        }
      }
    ];
    return await Board.aggregate(options);
  } catch (error) {
    throw new Error(`Error getting spots by districtID: ${error.message}`)
  }
}


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

export const countByWard = async (wardID) => {
  try {
    return Board.countDocuments({wardID: wardID});
  } catch (error) {
    throw new Error(`Error get wards of count documents: ${error.message}`)
  }
}