import EditRequest from '../models/editRequestModel.js';

export const createEditRequest = async (data) => {
  try {
    const newEditRequest = new EditRequest(data);
    await newEditRequest.save();
    return { message: 'Edit request created successfully' };
  } catch (error) {
    throw new Error(`Error creating edit request: ${error.message}`);
  }
};

export const updateRequestByID = async (requestID, newData) => {
  try {
    await EditRequest.findOneAndUpdate(
      { requestID },
      { $set: newData },
    );
    return { message: 'Edit request updated successfully' };
  } catch (error) {
    throw new Error(`Error updating edit request by ID: ${error.message}`);
  }
};

export const deleteRequestByID = async (requestID) => {
  try {
    await EditRequest.findOneAndDelete({ requestID });
    return { message: 'Edit request deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting edit request by ID: ${error.message}`);
  }
};

export const getAllRequests = async () => {
  try {
    const editRequests = await EditRequest.find();
    return editRequests;
  } catch (error) {
    throw new Error(`Error getting all edit requests: ${error.message}`);
  }
};

export const getRequestByID = async (requestID) => {
  try {
    const editRequest = await EditRequest.findOne({ requestID });
    return editRequest;
  } catch (error) {
    throw new Error(`Error getting edit request by ID: ${error.message}`);
  }
};

export const getRequestsByObjectID = async (objectID) => {
  try {
    const editRequests = await EditRequest.find({ objectID });
    return editRequests;
  } catch (error) {
    throw new Error(`Error getting edit requests by objectID: ${error.message}`);
  }
};

export const getRequestsByStatus = async (status) => {
  try {
    const editRequests = await EditRequest.find({ status });
    return editRequests;
  } catch (error) {
    throw new Error(`Error getting edit requests by status: ${error.message}`);
  }
};
