import District from '../models/districtModel.js';
import Ward from '../models/wardModel.js';
import Spot from '../models/spotModel.js';
import Board from '../models/boardModel.js';
import * as districtService from './districtService.js';
import * as wardService from './wardService.js';

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

// get district and ward name by lat, lng
export const getDistrictWardName = async (lat, lng) => {
  const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${lng}&apiKey=${process.env.REVERSE_GEOCODING_API}&lang=vi`;

  try {
    const res = await fetch(api);
    const data = await res.json();
    let districtName = data.items[0].address.city.replace('Quận ', '').trim();
    let wardName = data.items[0].address.district.replace('Phường ', '').trim();
    if (districtName.length === 1) {
      districtName = '0' + districtName;
    }
    if (wardName.length === 1) {
      wardName = '0' + wardName;
    }
    let address = data.items[0].address.label;
    console.log(address);
    address = address.slice(0, address.indexOf(', Phường')).split(',');
    if(address.length == 2){
      address = (address[0] == 'To Go') ? address[1].slice(1) : address.join(',');
    } else {
      address = address[0];
    }

    const  districtID = (await districtService.getIDByName(districtName)) || '';
    // console.log(districtName, districtID);
    const wardID = (await wardService.getIDByName(wardName)) || '';
    // console.log(wardName, wardID);

    return { address, districtName, wardName, districtID, wardID };
  } catch (error) {
    throw new Error(`Error getting district and ward name: ${error.message}`);
  }
}
