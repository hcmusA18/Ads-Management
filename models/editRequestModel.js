import mongoose from "mongoose";

const EditRequestSchema = new mongoose.Schema({
    requestID: {
        type: String,
        required: true,
        unique: true
    },
    requestTime: {
        type: Date,
        required: true
    },
    objectID: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    newInfo: {
        type: Object,
        required: true
    }
});

const EditRequest = mongoose.model('editRequests', EditRequestSchema);
export default EditRequest;