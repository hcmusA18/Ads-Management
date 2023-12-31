import Spot from '../models/spotModel.js'
import Report from '../models/reportModel.js';
import {getReportByID, createReport} from './reportService.js'
import {getAllReportTypes} from './reportTypeService.js';
import {getBoardByID} from './boardService.js'

const getAllSpots = async (districtID, wardID) => {
  const matchStage = {
    $match: {
      districtID: districtID || { $exists: true },
      wardID: wardID || { $exists: true }
    }
  };
  const options = [
    matchStage,
    {
      $lookup: {
        as: 'boards',
        from: 'boards',
        foreignField: 'spotID',
        localField: 'spotID',
        pipeline: [
          {
            $lookup: {
              as: 'reports',
              from: 'reports',
              foreignField: 'objectID',
              localField: 'boardID'
            }
          },
          {
            $project: {
              _id: 0,
              boardID: 1,
              reports: {
                $size: '$reports'
              }
            }
          }
        ]
      }
    },
    {
      $lookup: {
        as: 'reports',
        from: 'reports',
        foreignField: 'objectID',
        localField: 'spotID'
      }
    },
    {
      // lookup district
      $lookup: {
        from: 'districts',
        localField: 'districtID',
        foreignField: 'districtID',
        as: 'district',
        pipeline: [
          {
            $project: {
              _id: 0,
              districtID: 1,
              districtName: 1
            }
          }
        ]
      }
    },
    {
      // lookup ward
      $lookup: {
        from: 'wards',
        localField: 'wardID',
        foreignField: 'wardID',
        as: 'ward',
        pipeline: [
          {
            $project: {
              _id: 0,
              wardID: 1,
              wardName: 1
            }
          }
        ]
      }
    },
    {
      // lookup spot type
      $lookup: {
        from: 'spottypes',
        localField: 'spotType',
        foreignField: 'typeID',
        as: 'spottypes'
      }
    },
    {
      // lookup ads form
      $lookup: {
        from: 'adsforms',
        localField: 'adsForm',
        foreignField: 'formID',
        as: 'adsforms'
      }
    },
    {
      $unwind: {
        path: '$district',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$ward',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$spottypes',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$adsforms',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 0,
        spotID: 1,
        spotName: 1,
        latitude: 1,
        longitude: 1,
        spotImage: 1,
        address: {
          $concat: ['$address', ', Phường ', '$ward.wardName', ', Quận ', '$district.districtName']
        },
        adsFormName: '$adsforms.formName',
        spotTypeName: '$spottypes.typeName',
        planned: {
          $cond: {
            if: {
              $eq: ['$planned', 1]
            },
            then: 'Đã quy hoạch',
            else: 'Chưa quy hoạch'
          }
        },
        hasReport: {
          $cond: {
            if: {
              $gte: [{ $sum: [{ $size: '$reports' }, { $sum: '$boards.reports' }] }, 1]
            },
            then: true,
            else: false
          }
        },
        hasAds: {
          $cond: {
            if: { $eq: [{ $size: '$boards' }, 0] },
            then: false,
            else: true
          }
        }
      }
    },
    {
      $sort: {
        spotID: 1
      }
    }
  ]
  try {
    return await Spot.aggregate(options)
  } catch (error) {
    console.log(error)
    throw new Error(`Error getting all spots: ${error.message}`)
  }
}

const getDetailSpot = async (spotID) => {
  const options = [
    {
      $match: {
        spotID
      }
    },
    {
      $lookup: {
        as: 'boards',
        from: 'boards',
        foreignField: 'spotID',
        localField: 'spotID',
        pipeline: [
          {
            $lookup: {
              as: 'reports',
              from: 'reports',
              foreignField: 'objectID',
              localField: 'boardID',
              pipeline: [
                {
                  $lookup: {
                    as: 'reporttype',
                    from: 'reporttypes',
                    foreignField: 'typeID',
                    localField: 'reportType'
                  }
                },
                {
                  $unwind: {
                    path: '$reporttype',
                    preserveNullAndEmptyArrays: true
                  }
                },
                {
                  $project: {
                    _id: 0,
                    reportID: 1,
                    reporterName: 1,
                    sendTime: 1,
                    status: 1,
                    reportType: '$reporttype.typeName'
                  }
                }
              ]
            }
          },
          {
            $lookup: {
              as: 'boardtype',
              from: 'boardtypes',
              foreignField: 'typeID',
              localField: 'boardType'
            }
          },
          {
            $unwind: {
              path: '$boardtype',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $project: {
              _id: 0,
              boardID: 1,
              reports: 1,
              boardSize: { $concat: [{ $toString: '$width' }, 'x', { $toString: '$height' }] },
              quantity: 1,
              boardType: '$boardtype.typeName'
            }
          }
        ]
      }
    },
    {
      $lookup: {
        as: 'reports',
        from: 'reports',
        foreignField: 'objectID',
        localField: 'spotID',
        pipeline: [
          {
            $lookup: {
              as: 'reporttype',
              from: 'reporttypes',
              foreignField: 'typeID',
              localField: 'reportType'
            }
          },
          {
            $unwind: {
              path: '$reporttype',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $project: {
              _id: 0,
              reportID: 1,
              reporterName: 1,
              sendTime: 1,
              status: 1,
              reportType: '$reporttype.typeName'
            }
          }
        ]
      }
    },
    {
      // lookup district
      $lookup: {
        from: 'districts',
        localField: 'districtID',
        foreignField: 'districtID',
        as: 'district',
        pipeline: [
          {
            $project: {
              _id: 0,
              districtID: 1,
              districtName: 1
            }
          }
        ]
      }
    },
    {
      // lookup ward
      $lookup: {
        from: 'wards',
        localField: 'wardID',
        foreignField: 'wardID',
        as: 'ward',
        pipeline: [
          {
            $project: {
              _id: 0,
              wardID: 1,
              wardName: 1
            }
          }
        ]
      }
    },
    {
      // lookup spot type
      $lookup: {
        from: 'spottypes',
        localField: 'spotType',
        foreignField: 'typeID',
        as: 'spottypes'
      }
    },
    {
      // lookup ads form
      $lookup: {
        from: 'adsforms',
        localField: 'adsForm',
        foreignField: 'formID',
        as: 'adsforms'
      }
    },
    {
      $unwind: {
        path: '$district',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$ward',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$spottypes',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$adsforms',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 0,
        spotID: 1,
        spotName: 1,
        spotImage: 1,
        address: {
          $concat: ['$address', ', Phường ', '$ward.wardName', ', Quận ', '$district.districtName']
        },
        adsFormName: '$adsforms.formName',
        spotTypeName: '$spottypes.typeName',
        planned: {
          $cond: {
            if: {
              $eq: ['$planned', 1]
            },
            then: 'Đã quy hoạch',
            else: 'Chưa quy hoạch'
          }
        },
        reports: 1,
        boards: 1
      }
    }
  ]
  try {
    return await Spot.aggregate(options)
  } catch (error) {
    console.log(error)
    throw new Error(`Error getting all spots: ${error.message}`)
  }
}

const getListReport = async (reportIDs) => {
  try {
    reportIDs = reportIDs.split(',');
    const options = [
      {
        $match: {
          reportID: { $in: reportIDs }
        }
      },
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
        $unwind: {
          path: '$spotDistrict',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$spotWard',
          preserveNullAndEmptyArrays: true
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
    return await Report.aggregate(options);
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting list report: ${error.message}`);
  }

}

export default {
  createReport,
  getAllReportTypes,
  getAllSpots,
  getBoardByID,
  getDetailSpot,
  getReportByID,
  getListReport
};