import LicensingRequest from '../models/licensingRequestModel.js';
import EditRequest from '../models/editRequestModel.js';

class RequestService {
  constructor(model) {
    if (!model) {
      throw new Error('Model is required');
    }
    if (model !== LicensingRequest && model !== EditRequest) {
      throw new Error('Model is not valid');
    }
    this.model = model;
  }

  async create(data) {
    try {
      const newRequest = new this.model(data);
      await newRequest.save();
      return { message: `${this.model.modelName} created successfully` };
    } catch (error) {
      throw new Error(`Error creating ${this.model.modelName}: ${error.message}`);
    }
  }

  async updateByID(id, newData) {
    try {
      await this.model.findOneAndUpdate({ id }, { $set: newData });
      return { message: `${this.model.modelName} updated successfully` };
    } catch (error) {
      throw new Error(`Error updating ${this.model.modelName} by ID: ${error.message}`);
    }
  }

  async deleteByID(id) {
    try {
      await this.model.findOneAndDelete({ id });
      return { message: `${this.model.modelName} deleted successfully` };
    } catch (error) {
      throw new Error(`Error deleting ${this.model.modelName} by ID: ${error.message}`);
    }
  }

  async getAll() {
    try {
      return await this.model.find();
    } catch (error) {
      throw new Error(`Error getting all ${this.model.modelName}: ${error.message}`);
    }
  }

  async getByID(id) {
    try {
      return await this.model.findOne({ id });
    } catch (error) {
      throw new Error(`Error getting ${this.model.modelName} by ID: ${error.message}`);
    }
  }

  async getByObjectID(objectID) {
    try {
      return await this.model.find({ objectID });
    } catch (error) {
      throw new Error(`Error getting ${this.model.modelName} by objectID: ${error.message}`);
    }
  }

  async getByStatus(status) {
    try {
      return await this.model.find({ status });
    } catch (error) {
      throw new Error(`Error getting ${this.model.modelName} by status: ${error.message}`);
    }
  }
}

const licensingRequestService = new RequestService(LicensingRequest);
const editRequestService = new RequestService(EditRequest);

export { licensingRequestService, editRequestService };