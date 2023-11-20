import mongoose from "mongoose";

const LicensingRequestSchema = new mongoose.Schema({
    requestID: {
        type: String,
        required: true,
        unique: true
    },
    spotID: {
        type: String,
        required: true
    },
    adsImage: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    companyPhone: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: Number,
        required: true
    },

    
});

const LicensingRequest = mongoose.model('licensingRequests', LicensingRequestSchema);
export default LicensingRequest;