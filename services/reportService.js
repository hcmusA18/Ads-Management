import Report from '../models/reportModel.js';

export const createReport = async (data) => {
  try {
    const newReport = new Report(data);
    await newReport.save();
    return { message: 'Report created successfully' };
  } catch (error) {
    throw new Error(`Error creating report: ${error.message}`);
  }
};

export const updateReportByID = async (reportID, newData) => {
  try {
    await Report.findOneAndUpdate(
      { reportID },
      { $set: newData },
    );
    return { message: 'Report updated successfully' };
  } catch (error) {
    throw new Error(`Error updating report by ID: ${error.message}`);
  }
};

export const deleteReportByID = async (reportID) => {
  try {
    await Report.findOneAndDelete({ reportID });
    return { message: 'Report deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting report by ID: ${error.message}`);
  }
};

export const getAllReports = async () => {
  try {
    const reports = await Report.find();
    return reports;
  } catch (error) {
    throw new Error(`Error getting all reports: ${error.message}`);
  }
};

export const getReportByID = async (reportID) => {
  try {
    const report = await Report.findOne({ reportID });
    return report;
  } catch (error) {
    throw new Error(`Error getting report by ID: ${error.message}`);
  }
};

export const getReportsByObjectID = async (objectID) => {
  try {
    const reports = await Report.find({ objectID });
    return reports;
  } catch (error) {
    throw new Error(`Error getting reports by objectID: ${error.message}`);
  }
};

export const getReportsByType = async (reportType) => {
  try {
    const reports = await Report.find({ reportType });
    return reports;
  } catch (error) {
    throw new Error(`Error getting reports by type: ${error.message}`);
  }
};

export const getReportsByStatus = async (status) => {
  try {
    const reports = await Report.find({ status });
    return reports;
  } catch (error) {
    throw new Error(`Error getting reports by status: ${error.message}`);
  }
};
