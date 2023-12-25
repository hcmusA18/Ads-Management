import District from '../models/districtModel.js';
import Ward from '../models/wardModel.js';
import Spot from '../models/spotModel.js';
import Board from '../models/boardModel.js';

export const getAll = async () => {
  const options = [
    {
      $lookup: {
        from: 'wards',
        localField: 'districtID',
        foreignField: 'districtID',
        as: 'wards',
      }
    },
    {
      $lookup: {
        from: 'spots',
        localField: 'districtID',
        foreignField: 'districtID',
        as: 'spots',
      }
    },
    {
      $lookup: {
        from: 'boards',
        localField: 'spots.spotID',
        foreignField: 'spotID',
        as: 'boards',
      }
    },
    {
      $project: {
        _id: 0,
        districtID: 1,
        districtName: 1,
        wardsCount: { $size: '$wards' },
        spotsCount: { $size: '$spots' },
        boardsCount: { $size: '$boards' },
      }
    },
    {
      $sort: {
        districtID: 1
      }
    }
  ]
  try {
    const districts = await District.aggregate(options);
    return districts;
  } catch (error) {
    throw new Error(`Error getting all districts: ${error.message}`);
  }
}

export const getDetails = async (districtID) => {
  const options = [
    {
      $match: {
        districtID: districtID
      }
    },
    {
      $lookup: {
        from: 'spots',
        localField: 'wardID',
        foreignField: 'wardID',
        as: 'spots',
      }
    },
    {
      $lookup: {
        from: 'boards',
        localField: 'spots.spotID',
        foreignField: 'spotID',
        as: 'boards',
      }
    },
    {
      $project: {
        _id: 0,
        wardID: 1,
        wardName: 1,
        spotsCount: { $size: '$spots' },
        boardsCount: { $size: '$boards' },
      }
    },
    {
      $sort: {
        wardName: 1
      }
    }
  ]
  try {
    const wards = await Ward.aggregate(options);
    return wards;
  } catch (error) {
    throw new Error(`Error getting district details: ${error.message}`);
  }
}

export const getDistrictDetail = async (districtID) => {
  const options = [
    {
      $match: {
        districtID: districtID
      }
    },
    {
      $lookup: {
        from: 'wards',
        localField: 'districtID',
        foreignField: 'districtID',
        as: 'wards',
      }
    },
    {
      $lookup: {
        from: 'spots',
        localField: 'districtID',
        foreignField: 'districtID',
        as: 'spots',
      }
    },
    {
      $lookup: {
        from: 'boards',
        localField: 'spots.spotID',
        foreignField: 'spotID',
        as: 'boards',
      }
    },
    {
      $project: {
        _id: 0,
        districtID: 1,
        districtName: 1,
        wardsCount: { $size: '$wards' },
        spotsCount: { $size: '$spots' },
        boardsCount: { $size: '$boards' },
      }
    }
  ]
  try {
    const districts = await District.aggregate(options);
    return districts;
  } catch (error) {
    throw new Error(`Error getting all districts: ${error.message}`);
  }
}