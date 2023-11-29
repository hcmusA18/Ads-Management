import ReportType from '../models/reportTypeModel.js';

export const create = async (data) => {
  try {
    const newReportType = new ReportType(data);
    await newReportType.save();
    return { message: 'Report type created successfully' };
  } catch (error) {
    throw new Error(`Error creating report type: ${error.message}`);
  }
};

export const updateReportTypeByID = async (typeID, newData) => {
  try {
    await ReportType.findOneAndUpdate(
      { typeID },
      { $set: newData },
    );
    return { message: 'Report type updated successfully' };
  } catch (error) {
    throw new Error(`Error updating report type by ID: ${error.message}`);
  }
};

export const remove = async (typeID) => {
  try {
    await ReportType.findOneAndDelete({ typeID });
    return { message: 'Report type deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting report type by ID: ${error.message}`);
  }
};

export const getAllReportTypes = async () => {
  try {
    const reportTypes = await ReportType.find();
    return reportTypes;
  } catch (error) {
    throw new Error(`Error getting all report types: ${error.message}`);
  }
};

export const getReportTypeByID = async (typeID) => {
  try {
    const reportType = await ReportType.findOne({ typeID });
    return reportType;
  } catch (error) {
    throw new Error(`Error getting report type by ID: ${error.message}`);
  }
};
