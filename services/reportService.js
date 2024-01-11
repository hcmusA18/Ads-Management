import Report from '../models/reportModel.js'

export const createReport = async (data) => {
  try {
    const newReport = new Report(data);
    const res = await newReport.save();
    return res.reportID;
  } catch (error) {
    throw new Error(`Error creating report: ${error.message}`)
  }
}

export const updateReportByID = async (reportID, newData) => {
  // console.log(newData);
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
          from: 'reporttypes',
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
        $project: {
          _id: 0,
          reportID: 1,
          objectID: 1,
          reportType: '$reportType.typeName',
          reporterName: 1,
          sendTime: 1,
          status: 1,
          spotDistrictID: {
            $cond: {
              if: { $eq: ['$boardSpotInfo', []] },
              then: '$spotInfo.districtID',
              else: '$boardSpotInfo.districtID'
            }
          },
          spotWardID: {
            $cond: {
              if: { $eq: ['$boardSpotInfo', []] },
              then: '$spotInfo.wardID',
              else: '$boardSpotInfo.wardID'
            }
          },
        }
      },
      {
        $lookup: {
          from: 'districts',
          localField: 'spotDistrictID',
          foreignField: 'districtID',
          as: 'spotDistrict'
        }
      },
      {
        $lookup: {
          from: 'wards',
          localField: 'spotWardID',
          foreignField: 'wardID',
          as: 'spotWard'
        }
      },
      {
        $project: {
          reportID: 1,
          objectID: 1,
          reportType: 1,
          reporterName: 1,
          sendTime: 1,
          status: 1,
          spotDistrictName: '$spotDistrict.districtName',
          spotWardName: '$spotWard.wardName'
        }
      }
    ];
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
          from: 'reporttypes',
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
        $lookup: {
          from: 'officers',
          localField: 'officerName',
          foreignField: 'username',
          as: 'officer'
        }
      },
      {
        $unwind: {
          path: '$officer',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'districts',
          localField: 'officer.districtID',
          foreignField: 'districtID',
          as: 'officerDistrict'
        }
      },
      {
        $unwind: {
          path: '$officerDistrict',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'wards',
          localField: 'officer.wardID',
          foreignField: 'wardID',
          as: 'officerWard'
        }
      },
      {
        $unwind: {
          path: '$officerWard',
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
          reportImages: 1,
          officerName: 1,
          officerDistrict: '$officerDistrict.districtName',
          officerWard: '$officerWard.wardName',
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
    // console.log(error);
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
            { 'boardSpotInfo.wardID': officerRole },
            { 'objectID': { $regex: '^AD' } } // Include all reports with objectID starting with 'AD'
          ],
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
    console.error('Error fetching reports:', error);
    throw error;
  }
};

export const getReportsWithDistrictID = async () => {
  try {
    const options = [
      {
        $lookup: {
          from: 'spots',
          localField: 'objectID',
          foreignField: 'spotID',
          as: 'spotInfo'
        }
      },
      {
        $unwind: {
          path: '$spotInfo',
          preserveNullAndEmptyArrays: true
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
          districtID: {
            $cond: {
              if: {$eq : ['$objectID', '$spotInfo.spotID']},
              then: '$spotInfo.districtID',
              else: {
                $cond: {
                  if: {$eq: ['$objectID', '$boardInfo.boardID']},
                  then: '$boardSpotInfo.districtID',
                  else: null,
                }
              },
            }
          },
          isSpot: {
            $cond: {
              if: {$eq : ['$objectID', '$spotInfo.spotID']},
              then: true,
              else: false
            }
          }
        }
      },
      {
        $lookup: {
          from: 'districts',
          localField: 'districtID',
          foreignField: 'districtID',
          as: 'reportDistrictInfo'
        }
      },
      {
        $unwind: {
          path: '$reportDistrictInfo',
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
          districtName: '$reportDistrictInfo.districtName',
          isSpot: 1
        }
      }
    ]
    const reports = await Report.aggregate(options);
    return reports;
  } catch (error) {
    throw new Error(`Error getting all reports: ${error.message}`);
  }
};

export const basicCountReports = async () => {
  const totalReports = await Report.countDocuments();
  const handledReports = await Report.countDocuments({ status: 1 });
  const notHandledReports = await Report.countDocuments({ status: 0 });

  return {totalReports, handledReports, notHandledReports};
}

export const getReportTypeCounts = async () => {
  try {
    const reportTypeCounts = await Report.aggregate([
      {
        $lookup: {
          from: 'reporttypes', // Assuming the name of your reporttypes collection
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
          typeName: '$reportType.typeName',
        }
      },
      {
        $group: {
          _id: '$typeName',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          typeName: 1,
          count: 1,
        }
      },
    ]);

    return reportTypeCounts;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getReportCountsDistrict = async () => {
  try {
    let currentDate = new Date();
    currentDate = currentDate.setMonth(currentDate.getMonth() - 3)
    const startDate = new Date(currentDate);
    console.log(startDate);
    const reportDistrictCounts = await Report.aggregate([
      {
        $match: {
          sendTime: { $gte: startDate } // Filter reports within the last 3 months
        }
      },
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
        $project: {
          _id: 0,
          spotDistrictID: {
            $cond: {
              if: { $eq: ['$boardSpotInfo', []] },
              then: '$spotInfo.districtID',
              else: '$boardSpotInfo.districtID'
            }
          },
        }
      },
      {
        $group: {
          _id: '$spotDistrictID',
          count: {$sum: 1},
        }
      },
      {
        $project:{
          districtID: '$spotDistrictID',
          count: 1,
        }
      }
    ]);

    return reportDistrictCounts;
  } catch (error) {
    console.error('Error:', error);
  }
}

export const getReportCountsByObjectType = async () => {
  try {
    const reportCounts = await Report.aggregate([
      {
        $group: {
          _id: {
            $cond: {
              if: { $regexMatch: { input: '$objectID', regex: /^QC\d{4}$/ } },
              then: 'board',
              else: 'spot'
            }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    return reportCounts;
  } catch (error) {
    console.error('Error:', error);
  }
};