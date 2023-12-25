import LicensingRequest from '../models/licensingRequestModel.js';

export const create = async (data) => {
  try {
    // console.log(data);
    const newRequest = new LicensingRequest(data);
    await newRequest.save();
    return { message: 'Licensing request created successfully' };
  } catch (error) {
    throw new Error(`Error creating licensing request: ${error.message}`);
  }
};

export const updateByID = async (id, newData) => {
  try {
    await LicensingRequest.findOneAndUpdate(
      { id },
      { $set: newData },
    );
    return { message: 'Licensing request updated successfully' };
  } catch (error) {
    throw new Error(`Error updating licensing request by ID: ${error.message}`);
  }
};

export const remove = async (id) => {
  // console.log(id);
  try {
    await LicensingRequest.findOneAndDelete({ requestID: id });
    return { message: 'Licensing request deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting licensing request by ID: ${error.message}`);
  }
};

export const getAll = async () => {
  try {
    return await LicensingRequest.find();
  } catch (error) {
    throw new Error(`Error getting all licensing requests: ${error.message}`);
  }
};

export const getByUsername = async (username) => {
  try {
    return await LicensingRequest.find({ officerUsername: username });
  } catch (error) {
    throw new Error(`Error getting licensing requests by username ${username}: ${error.message}`);
  }
}

export const getByID = async (id) => {
  try {
    return await LicensingRequest.findOne({ requestID: id });
  } catch (error) {
    throw new Error(`Error getting licensing request by ID: ${error.message}`);
  }
};

export const getByObjectID = async (objectID) => {
  try {
    return await LicensingRequest.find({ objectID });
  } catch (error) {
    throw new Error(`Error getting licensing requests by objectID: ${error.message}`);
  }
};

export const getByStatus = async (status) => {
  try {
    return await LicensingRequest.find({ status });
  } catch (error) {
    throw new Error(`Error getting licensing requests by status: ${error.message}`);
  }
};
