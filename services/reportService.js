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
    const options = [
      {
        $lookup: {
          from: 'reportTypes',
          localField: 'reportType',
          foreignField: 'typeID',
          as: 'reportType'
        }
      },
      {
        $unwind: {
          path: '$reportType',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 0,
          reportID: 1,
          objectID: 1,
          reportType: 1,
          reportTypeName: '$reportType.typeName',
          reporterName: 1,
          reporterEmail: 1,
          sendTime: 1,
          status: 1
        }
      }
    ]

    const reports = await Report.aggregate(options);
    return reports;
  } catch (error) {
    throw new Error(`Error getting all reports: ${error.message}`);
  }
};

export const getReportByID = async (reportID) => {
  try {
    const options = [
      {
        $lookup: {
          from: 'reportTypes',
          localField: 'reportType',
          foreignField: 'typeID',
          as: 'reportType'
        }
      },
      {
        $unwind: {
          path: '$reportType',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 0,
          reportID: 1,
          objectID: 1,
          reportType: 1,
          reportTypeName: '$reportType.typeName',
          reporterName: 1,
          reporterEmail: 1,
          reporterPhone: 1,
          sendTime: 1,
          status: 1,
          reportInfo: 1,
          solution: 1,
          reportImages: 1
        }
      }
    ]
    let report = await Report.aggregate([
      { $match: { 'reportID': reportID } }, ...options
    ]);
    report = report[0];
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

export const getReportByOfficerRole = async (officerRole)  => {
  try {
    const reports = await Report.aggregate([
      {
        $lookup: {
          from: 'spots',
          localField: 'objectID',
          foreignField: 'spotID',
          as: 'spotInfo'
        }
      },
      {
        $lookup: {
          from: 'boards',
          localField: 'objectID',
          foreignField: 'boardID',
          as: 'boardInfo'
        }
      },
      {
        $unwind: {
          path: '$boardInfo',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'spots',
          localField: 'boardInfo.spotID',
          foreignField: 'spotID',
          as: 'boardSpotInfo'
        }
      },
      {
        $match: {
          $or: [
            { 'spotInfo.districtID': officerRole },
            { 'spotInfo.wardID': officerRole },
            { 'boardSpotInfo.districtID': officerRole },
            { 'boardSpotInfo.wardID': officerRole }
          ]
        }
      },
      {
        $lookup: {
          from : 'reporttypes',
          localField: 'reportType',
          foreignField: 'typeID',
          as: 'htbc'
        }
      },
      {
        $unwind: {
          path: '$htbc',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 0,
          reportID: 1,
          objectID: 1,
          reportType: '$htbc.typeName',
          reporterName: 1,
          reporterEmail: 1,
          sendTime: 1,
          status: 1,
          // test1: {$arrayElemAt: ['$spotInfo.spotID', 0]},
          // test2: '$objectID',
          wardID: {
            $cond: {
              if: {$eq : ['$objectID', {$arrayElemAt: ['$spotInfo.spotID', 0]}]},
              then: '$spotInfo.wardID',
              else: {
                $cond: {
                  if: {$eq: ['$objectID', '$boardInfo.boardID']},
                  then: '$boardSpotInfo.wardID',
                  else: null,
                }
              },
            }
          }
        }
      },
      {
        $lookup: {
          from: 'wards',
          localField: 'wardID',
          foreignField: 'wardID',
          as: 'wardInfo'
        }
      },
      {
        $unwind: {
          path: '$wardInfo',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          reportID: 1,
          objectID: 1,
          reportType: 1,
          reporterName: 1,
          reporterEmail: 1,
          sendTime: 1,
          status: 1,
          wardName: '$wardInfo.wardName'
        }
      }
    ]);

    return reports;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
}
