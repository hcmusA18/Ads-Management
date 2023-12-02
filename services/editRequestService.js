import EditRequest from '../models/editRequestModel.js'

export const create = async (data) => {
  try {
    const newEditRequest = new EditRequest(data)
    await newEditRequest.save()
    return { message: 'Edit request created successfully' }
  } catch (error) {
    throw new Error(`Error creating edit request: ${error.message}`)
  }
}

export const updateByID = async (id, newData) => {
  try {
    await EditRequest.findOneAndUpdate(
      { id },
      { $set: newData },
    );
    return { message: 'Edit request updated successfully' };
  } catch (error) {
    throw new Error(`Error updating edit request by ID: ${error.message}`);
  }
};

export const deleteByID = async (id) => {
  try {
    await EditRequest.findOneAndDelete({ id });
    return { message: 'Edit request deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting edit request by ID: ${error.message}`);
  }
};

export const getAllRequests = async () => {
  try {
    return await EditRequest.find()
  } catch (error) {
    throw new Error(`Error getting all edit requests: ${error.message}`)
  }
}

export const getByID = async (id) => {
  try {
    return await EditRequest.findOne({ id })
  } catch (error) {
    throw new Error(`Error getting edit request by ID: ${error.message}`)
  }
}

export const getByObjectID = async (objectID) => {
  try {
    return await EditRequest.find({ objectID })
  } catch (error) {
    throw new Error(`Error getting edit requests by objectID: ${error.message}`)
  }
}

export const getByStatus = async (status) => {
  try {
    return await EditRequest.find({ status })
  } catch (error) {
    throw new Error(`Error getting edit requests by status: ${error.message}`)
  }
}
