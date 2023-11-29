import Spot from '../models/spotModel.js';

export const createSpot = async (data) => {
  try {
    const newSpot = new Spot(data);
    await newSpot.save();
    return { message: 'Spot created successfully' };
  } catch (error) {
    throw new Error(`Error creating spot: ${error.message}`);
  }
};

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
    const spots = await Spot.find();
    return spots;
  } catch (error) {
    throw new Error(`Error getting all spots: ${error.message}`);
  }
};

export const getSpotByID = async (spotID) => {
  try {
    const spot = await Spot.findOne({ spotID });
    return spot;
  } catch (error) {
    throw new Error(`Error getting spot by ID: ${error.message}`);
  }
};

export const getSpotsByDistrictID = async (districtID) => {
  try {
    const spots = await Spot.find({ districtID });
    return spots;
  } catch (error) {
    throw new Error(`Error getting spots by districtID: ${error.message}`);
  }
};

export const getSpotsByWardID = async (wardID) => {
  try {
    const spots = await Spot.find({ wardID });
    return spots;
  } catch (error) {
    throw new Error(`Error getting spots by wardID: ${error.message}`);
  }
};

export const getSpotsBySpotType = async (spotType) => {
  try {
    const spots = await Spot.find({ spotType });
    return spots;
  } catch (error) {
    throw new Error(`Error getting spots by spotType: ${error.message}`);
  }
};

export const getSpotsByPlanned = async (planned) => {
  try {
    const spots = await Spot.find({ planned });
    return spots;
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