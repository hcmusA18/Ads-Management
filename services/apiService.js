import Spot from '../models/spotModel.js'

const getAllSpots = async () => {
  const options = [
    {
      $lookup: {
        from: 'districts',
        localField: 'districtID',
        foreignField: 'districtID',
        as: 'district'
      }
    },
    {
      $lookup: {
        from: 'wards',
        localField: 'wardID',
        foreignField: 'wardID',
        as: 'ward'
      }
    },
    {
      $lookup: {
        from: 'spottypes',
        localField: 'spotType',
        foreignField: 'typeID',
        as: 'spottypes'
      }
    },
    {
      $lookup: {
        from: 'adsforms',
        localField: 'adsForm',
        foreignField: 'formID',
        as: 'adsforms'
      }
    },
    {
      $unwind: {
        path: '$district',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$ward',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$spottypes',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$adsforms',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 0,
        spotID: 1,
        spotName: 1,
        latitude: 1,
        longitude: 1,
        address: {
          $concat: ['$address', ', Phường ', '$ward.wardName', ', Quận ', '$district.districtName']
        },
        adsFormName: '$adsforms.formName',
        spotTypeName: '$spottypes.typeName',
        planned: {
          $cond: {
            if: { $eq: ['$planned', 1] },
            then: 'Đã quy hoạch',
            else: 'Chưa quy hoạch'
          }
        }
      }
    }
  ]
  try {
    return await Spot.aggregate(options)
  } catch (error) {
    console.log(error)
    throw new Error(`Error getting all spots: ${error.message}`)
  }
}

export default {
  getAllSpots,
}