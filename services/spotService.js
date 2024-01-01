import Spot from '../models/spotModel.js'
import mongoose from 'mongoose'

export const createSpot = async (data) => {
  try {
    const newSpot = new Spot(data)
    await newSpot.save()
    return { message: 'Spot created successfully' }
  } catch (error) {
    throw new Error(`Error creating spot: ${error.message}`)
  }
}

export const updateSpotByID = async (spotID, newData) => {
  try {
    await Spot.findOneAndUpdate(
      { spotID },
      { $set: newData },
    );
    return { message: 'Spot updated successfully' };
  } catch (error) {
    throw new Error(`Error updating spot by ID: ${error.message}`);
  }
};

export const deleteSpotByID = async (spotID) => {
  try {
    const isReferenced = await Promise.all(
      Object.values(mongoose.models)
        .filter((model) => model.modelName !== 'spots')
        .map(async (model) => {
          if (model.schema.paths.spotID) {
            return await model.exists({ spotID });
          }
          return null;
        })
    );
    
    if (isReferenced.some(Boolean)) {
      // console.log(isReferenced)
      // console.log('Không thể xóa điểm đặt vì còn dữ liệu phụ thuộc')
      return { message: 'Không thể xóa điểm đặt vì còn dữ liệu phụ thuộc' };
    }
    await Spot.findOneAndDelete({ spotID });
    // console.log('Xóa điểm đặt thành công')
    return { message: 'Xóa điểm đặt thành công' };
  } catch (error) {
    // console.log(`Xóa điểm đặt thất bại: ${error.message}`)
    throw new Error(`Xóa điểm đặt thất bại: ${error.message}`);
  }
};

export const getAllSpots = async () => {
  try {
    const options = [
      {
        $lookup: {
          from: 'districts',
          localField: 'districtID',
          foreignField: 'districtID',
          as: 'district',
        },
      },
      {
        $lookup: {
          from: 'wards',
          localField: 'wardID',
          foreignField: 'wardID',
          as: 'ward',
        }
      },
      {
        $lookup: {
          from: 'spottypes',
          localField: 'spotType',
          foreignField: 'typeID',
          as: 'spottypes',
        }
      },
      {
        $lookup: {
          from: 'adsforms',
          localField: 'adsForm',
          foreignField: 'formID',
          as: 'adsforms',
        }
      },
      {
        $unwind: {
          path: '$district',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $unwind: {
          path: '$ward',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $unwind: {
          path: '$spottypes',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $unwind: {
          path: '$adsforms',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $project: {
          _id: 0,
          spotID: 1,
          spotName: 1,
          spotType: 1,
          adsForm: 1,
          address: 1,
          districtID: 1,
          wardID: 1,
          districtName: '$district.districtName',
          wardName: '$ward.wardName',
          adsFormName: '$adsforms.formName',
          spotTypeName: '$spottypes.typeName',
          planned: 1,
        }
      },
      {
        $sort: {
          spotID: 1, // 1 for ascending, -1 for descending
        },
      },
    ]
    return await Spot.aggregate(options);
  } catch (error) {
    throw new Error(`Error getting all spots: ${error.message}`)
  }}

export const getSpotByID = async (spotID) => {
  try {
    const options = [
      {
        $match: {
          spotID: spotID,
        }
      },
      {
        $lookup: {
          from: 'adsforms',
          localField: 'adsForm',
          foreignField: 'formID',
          as: 'adsform',
        }
      },
      {
        $lookup: {
          from: 'spottypes',
          localField: 'spotType',
          foreignField: 'typeID',
          as: 'spottype',
        }
      },
      {
        $lookup: {
          from: 'districts',
          localField: 'districtID',
          foreignField: 'districtID',
          as: 'district',
        },
      },
      {
        $lookup: {
          from: 'wards',
          localField: 'wardID',
          foreignField: 'wardID',
          as: 'ward',
        }
      },
      {
        $unwind: {
          path: '$district',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $unwind: {
          path: '$ward',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $unwind: {
          path: '$spottype',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $unwind: {
          path: '$adsform',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $project: {
          _id: 0,
          spotID: 1,
          spotName: 1,
          spotType: 1,
          spotTypeName: '$spottype.typeName',
          address: 1,
          districtID: 1,
          wardID: 1,
          districtName: '$district.districtName',
          wardName: '$ward.wardName',
          planned: 1,
          adsFormName: '$adsform.formName',
          spotImage: 1,
          adsForm: 1,
          longitude: 1,
          latitude: 1
        }
      }
    ]
    const data = await Spot.aggregate(options);
    return data[0];
  } catch (error) {
    throw new Error(`Error getting all spots: ${error.message}`)
  }
}

export const getSpotsByDistrictID = async (districtID) => {
  try {
    const options = [
      {
        $match: {
          districtID: districtID,
        }
      },
      {
        $lookup: {
          from: 'districts',
          localField: 'districtID',
          foreignField: 'districtID',
          as: 'district',
        },
      },
      {
        $lookup: {
          from: 'wards',
          localField: 'wardID',
          foreignField: 'wardID',
          as: 'ward',
        }
      },
      {
        $lookup: {
          from: 'spottypes',
          localField: 'spotType',
          foreignField: 'typeID',
          as: 'spottypes',
        }
      },
      {
        $lookup: {
          from: 'adsforms',
          localField: 'adsForm',
          foreignField: 'formID',
          as: 'adsforms',
        }
      },
      {
        $unwind: {
          path: '$district',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $unwind: {
          path: '$ward',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $unwind: {
          path: '$spottypes',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $unwind: {
          path: '$adsforms',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $project: {
          _id: 0,
          spotID: 1,
          spotName: 1,
          spotType: 1,
          adsForm: 1,
          address: 1,
          districtID: 1,
          wardID: 1,
          districtName: '$district.districtName',
          wardName: '$ward.wardName',
          adsFormName: '$adsforms.formName',
          spotTypeName: '$spottypes.typeName',
          planned: 1,
        }
      }
    ]
    return await Spot.aggregate(options);
  } catch (error) {
    throw new Error(`Error getting spots by districtID: ${error.message}`)
  }
}

export const getSpotsByWardID = async (wardID) => {
  try {
    const options = [
      {
        $match: {
          wardID: wardID,
        }
      },
      {
        $lookup: {
          from: 'wards',
          localField: 'wardID',
          foreignField: 'wardID',
          as: 'ward',
        }
      },
      {
        $lookup: {
          from: 'districts',
          localField: 'districtID',
          foreignField: 'districtID',
          as: 'district',
        },
      },
      {
        $lookup: {
          from: 'spottypes',
          localField: 'spotType',
          foreignField: 'typeID',
          as: 'spottypes',
        }
      },
      {
        $lookup: {
          from: 'adsforms',
          localField: 'adsForm',
          foreignField: 'formID',
          as: 'adsforms',
        }
      },
      {
        $unwind: {
          path: '$ward',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $unwind: {
          path: '$district',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $unwind: {
          path: '$spottypes',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $unwind: {
          path: '$adsforms',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $project: {
          _id: 0,
          spotID: 1,
          spotName: 1,
          spotType: 1,
          adsForm: 1,
          address: 1,
          districtID: 1,
          districtName: '$district.districtName',
          wardID: 1,
          wardName: '$ward.wardName',
          adsFormName: '$adsforms.formName',
          spotTypeName: '$spottypes.typeName',
          planned: 1,
        }
      }
    ]
    return await Spot.aggregate(options);
  } catch (error) {
    throw new Error(`Error getting spots by wardID: ${error.message}`)
  }
}

export const getSpotsBySpotType = async (spotType) => {
  try {
    return await Spot.find({ spotType })
  } catch (error) {
    throw new Error(`Error getting spots by spotType: ${error.message}`)
  }
}

export const getSpotsByPlanned = async (planned) => {
  try {
    return await Spot.find({ planned });
  } catch (error) {
    throw new Error(`Error getting spots by planned: ${error.message}`);
  }
};

export const countAll = async () => {
  try {
    return Spot.countDocuments();
  } catch (error) {
    throw new Error(`Error couting spots by planned: ${error.message}`);
  }
};

export const countAllOfDistrict = async (districtID) => {
  try {
    return Spot.countDocuments({districtID: districtID});
  } catch (error) {
    throw new Error(`Error get District of count documents: ${error.message}`)
  }
}

export const countByWard = async (wardID) => {
  try {
    return Spot.countDocuments({wardID: wardID});
  } catch (error) {
    throw new Error(`Error get wards of count documents: ${error.message}`)
  }
};

export const getAdsFormBySpotID = async (spotID) => {
  try {
    const options = [
      {
        $match: {
          spotID: spotID,
        }
      },
      {
        $lookup: {
          from: 'adsforms',
          localField: 'adsForm',
          foreignField: 'formID',
          as: 'adsform',
        }
      },
      {
        $unwind: {
          path: '$adsform',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $project: {
          _id: 0,
          adsForm: 1,
          adsFormName: '$adsform.formName',
          adsFormDescription: '$adsform.description',
        }
      }
    ]
    return await Spot.aggregate(options);
  } catch (error) {
    throw new Error(`Error getting ads form by spotID: ${error.message}`);
  }
};
