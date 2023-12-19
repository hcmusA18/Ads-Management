import apiService from '../../services/apiService.js';

export const getReport = async (spotID) => {
  try {
    return await apiService.getReportByID(spotID);
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting spot: ${error.message}`);
  }
}

export const createReport = async (report) => {
  try {
    return await apiService.createReport(report);
  } catch (error) {
    console.log(error);
    throw new Error(`Error creating report: ${error.message}`);
  }
}

export const getAllReportTypes = async () => {
  try {
    return await apiService.getAllReportTypes();
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting all report type: ${error.message}`);
  }
}

export const getListReport = async (reportIDs) => {
  try {
    return await apiService.getListReport(reportIDs);
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting list report: ${error.message}`);
  }
}