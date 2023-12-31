import apiService from '../../services/apiService.js'

export const getAllSpots = async (districtID, wardID) => {
  try {
    return await apiService.getAllSpots(districtID, wardID);
  } catch (error) {
    console.log(error)
    throw new Error(`Error getting all spots: ${error.message}`)
  }
}

export const getDetailSpot = async (spotID) => {
  try {
    return await apiService.getDetailSpot(spotID);
  } catch (error) {
    console.log(error)
    throw new Error(`Error getting detail spot: ${error.message}`)
  }
}