import LicensingRequest from '../models/licensingRequestModel.js'
import EditRequest from '../models/editRequestModel.js'

class RequestService {
  constructor(model) {
    if (!model) {
      throw new Error('Model is required')
    }
    if (model !== LicensingRequest && model !== EditRequest) {
      throw new Error('Model is not valid')
    }
    this.model = model
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
      let options = []
      if (this.model === LicensingRequest) {
        options = [
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
              requestID: 1,
              spotID: 1,
              wardID: 1,
              districtID: 1,
              wardName: '$ward.wardName',
              districtName: '$district.districtName',
              officerUsername: 1,
              startDate: 1,
              endDate: 1,
              status: 1
            }
          }
        ]
      } else {
        options = [
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
              combinedSpotID: { $ifNull: ['$board.spotID', '$spot.spotID'] }
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
          {
            $lookup: {
              from: 'districts',
              localField: 'spot.districtID',
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
            $project: {
              _id: 0,
              requestID: 1,
              objectID: 1,
              wardID: 1,
              districtID: 1,
              wardName: '$ward.wardName',
              districtName: '$district.districtName',
              officerUsername: 1,
              reason: 1,
              status: 1
            }
          }
        ]
      }

      return await this.model.aggregate(options)
    } catch (error) {
      throw new Error(`Error getting all ${this.model.modelName}: ${error.message}`)
    }
  }

  async getByID(id) {
    try {
      return await this.model.findOne({ id })
    } catch (error) {
      throw new Error(`Error getting ${this.model.modelName} by ID: ${error.message}`)
    }
  }

  async getByObjectID(objectID) {
    try {
      return await this.model.find({ objectID })
    } catch (error) {
      throw new Error(`Error getting ${this.model.modelName} by objectID: ${error.message}`)
    }
  }

  async getByStatus(status) {
    try {
      return await this.model.find({ status })
    } catch (error) {
      throw new Error(`Error getting ${this.model.modelName} by status: ${error.message}`)
    }
  }
}

const licensingRequestService = new RequestService(LicensingRequest)
const editRequestService = new RequestService(EditRequest)

export { licensingRequestService, editRequestService }
