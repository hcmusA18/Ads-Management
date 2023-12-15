import apiService from '../../services/apiService.js';

export const getReport = async (spotID) => {
  try {
    return await apiService.getReportByID(spotID);
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting spot: ${error.message}`);
  }
}