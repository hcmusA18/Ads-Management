import apiService from '../../services/apiService.js'

export const getAllSpots = async () => {
  try {
    return await apiService.getAllSpots();
  } catch (error) {
    console.log(error)
    throw new Error(`Error getting all spots: ${error.message}`)
  }
}