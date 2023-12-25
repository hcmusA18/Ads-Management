import LicensingRequest from '../models/licensingRequestModel.js'
import EditRequest from '../models/editRequestModel.js'
import { request } from 'http'

class RequestService {
  constructor(model) {
    if (!model) {
      throw new Error('Model is required')
    }
    if (model !== LicensingRequest && model !== EditRequest) {
      throw new Error('Model is not valid')
    }
    this.model = model

    this.commonOptions = [
      {
        $lookup: {
          from: 'wards',
          localField: 'spot.wardID',
          foreignField: 'wardID',
          as: 'ward'
        }
      },
      {
        $unwind: {
          path: '$ward',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'districts',
          localField: 'ward.districtID',
          foreignField: 'districtID',
          as: 'district'
        }
      },
      {
        $unwind: {
          path: '$district',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 0,
          wardID: 1,
          districtID: 1,
          wardName: '$ward.wardName',
          districtName: '$district.districtName',
          officerUsername: 1,
          status: 1
        }
      }
    ]
  }

  buildAggregateOptions() {
    const commonOptions = [
      // {
      //   $lookup: {
      //     from: 'spots',
      //     localField: 'spotID',
      //     foreignField: 'spotID',
      //     as: 'spot'
      //   }
      // },
      // {
      //   $unwind: {
      //     path: '$spot',
      //     preserveNullAndEmptyArrays: true
      //   }
      // },
      {
        $lookup: {
          from: 'wards',
          localField: 'spot.wardID',
          foreignField: 'wardID',
          as: 'ward'
        }
      },
      {
        $unwind: {
          path: '$ward',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'districts',
          localField: 'ward.districtID',
          foreignField: 'districtID',
          as: 'district'
        }
      },
      {
        $unwind: {
          path: '$district',
          preserveNullAndEmptyArrays: true
        }
      }
    ]
    switch (this.model) {
      case LicensingRequest:
        return [
          {
            $lookup: {
              from: 'spots',
              localField: 'spotID',
              foreignField: 'spotID',
              as: 'spot'
            }
          },
          {
            $unwind: {
              path: '$spot',
              preserveNullAndEmptyArrays: true
            }
          },
          ...commonOptions,
          {
            $project: this.buildProject()
          }
        ]
      case EditRequest:
        return [
          {
            $lookup: {
              from: 'boards',
              localField: 'objectID',
              foreignField: 'boardID',
              as: 'board'
            }
          },
          {
            $unwind: {
              path: '$board',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $addFields: {
              combinedSpotID: { $ifNull: ['$board.spotID', '$objectID'] }
            }
          },
          {
            $lookup: {
              from: 'spots',
              localField: 'combinedSpotID',
              foreignField: 'spotID',
              as: 'spot'
            }
          },
          {
            $unwind: {
              path: '$spot',
              preserveNullAndEmptyArrays: true
            }
          },
          ...commonOptions,
          {
            $project: this.buildProject()
          }
        ]
      default:
        throw new Error('Model is not valid')
    }
  }

  buildProject() {
    const commonProject = {
      _id: 0,
      wardID: 1,
      districtID: 1,
      wardName: '$ward.wardName',
      districtName: '$district.districtName',
      officerUsername: 1,
      status: 1
    }
    switch (this.model) {
      case LicensingRequest:
        return {
          ...commonProject,
          requestID: 1,
          spotID: 1,
          startDate: 1,
          endDate: 1
        }
      case EditRequest:
        return {
          ...commonProject,
          requestID: 1,
          objectID: 1,
          reason: 1,
          newInfo: 1,
          requestTime: 1

        }
      default:
        throw new Error('Model is not valid')
    }
  }

  async create(data) {
    try {
      const newRequest = new this.model(data)
      await newRequest.save()
      return { message: `${this.model.modelName} created successfully` }
    } catch (error) {
      throw new Error(`Error creating ${this.model.modelName}: ${error.message}`)
    }
  }

  async updateByID(id, newData) {
    try {
      await this.model.findOneAndUpdate({ id }, { $set: newData })
      return { message: `${this.model.modelName} updated successfully` }
    } catch (error) {
      throw new Error(`Error updating ${this.model.modelName} by ID: ${error.message}`)
    }
  }

  async deleteByID(id) {
    try {
      await this.model.findOneAndDelete({ id })
      return { message: `${this.model.modelName} deleted successfully` }
    } catch (error) {
      throw new Error(`Error deleting ${this.model.modelName} by ID: ${error.message}`)
    }
  }

  async getAll() {
    try {
      return await this.model.aggregate(this.buildAggregateOptions())
    } catch (error) {
      throw new Error(`Error getting all ${this.model.modelName}: ${error.message}`)
    }
  }

  async getByID(id) {
    try {
      const options = this.buildAggregateOptions()
      if (this.model === EditRequest) {
        options.push({
          $match: { requestID: id }
        })
      } else {
        options.push({
          $match: { requestID: id }
        })
      }
      const data = await this.model.aggregate(options)
      return data[0]
    } catch (error) {
      throw new Error(`Error getting ${this.model.modelName} by ID: ${error.message}`)
    }
  }

  async getByObjectID(objectID) {
    try {
      if (this.model === RequestService) throw new Error('Only EditRequest has objectID')
      const options = this.buildAggregateOptions()
      options.push({
        $match: { objectID: objectID }
      })
      return await this.model.aggregate(options)
    } catch (error) {
      throw new Error(`Error getting ${this.model.modelName} by objectID: ${error.message}`)
    }
  }

  async getByStatus(status) {
    try {
      const options = this.buildAggregateOptions()
      options.push({
        $match: { status }
      })
      return await this.model.aggregate(options);
    } catch (error) {
      throw new Error(`Error getting ${this.model.modelName} by status: ${error.message}`)
    }
  }

  updateStatus = async (id, status) => {
    try {
      await this.model.findOneAndUpdate(
        { requestID: id },
        { status: status },
      );
      return { message: 'Request status updated successfully' };
    } catch (error) {
      throw new Error(`Error updating request status: ${error.message}`);
    }
  }
}

const licensingRequestService = new RequestService(LicensingRequest);
const editRequestService = new RequestService(EditRequest);

export { licensingRequestService, editRequestService };
