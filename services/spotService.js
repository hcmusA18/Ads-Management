import Spot from '../models/spotModel.js'

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
    await Spot.findOneAndDelete({ spotID });
    return { message: 'Spot deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting spot by ID: ${error.message}`);
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
        $project: {
          _id: 0,
          spotID: 1,
          spotName: 1,
          spotType: 1,
          address: 1,
          districtID: 1,
          wardID: 1,
          districtName: '$district.districtName',
          wardName: '$ward.wardName',
          planned: 1,
        }
      }
    ]
    return await Spot.aggregate(options);
  } catch (error) {
    throw new Error(`Error getting all spots: ${error.message}`)
  }
}

export const getSpotByID = async (spotID) => {
  try {
    return await Spot.findOne({ spotID })
  } catch (error) {
    throw new Error(`Error getting spot by ID: ${error.message}`)
  }
}

export const getSpotsByDistrictID = async (districtID) => {
  try {
    return await Spot.find({ districtID })
  } catch (error) {
    throw new Error(`Error getting spots by districtID: ${error.message}`)
  }
}

export const getSpotsByWardID = async (wardID) => {
  try {
    return await Spot.find({ wardID })
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
    throw new Error(`Error get wards of count documents: ${error.message}`)
  }
}