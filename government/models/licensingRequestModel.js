import mongoose from 'mongoose';

const LicensingRequestSchema = new mongoose.Schema({
    requestID: {
        type: String,
        unique: true
    },
    spotID: {
        type: String,
        required: true
    },
    adsImages: {
        type: Array,
        required: true
    },
    boardType: {
        type: String,
        require: true,
    },
    height: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        require: true,
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
    },
    officerUsername: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
});

const LicensingRequest = mongoose.model('licensingRequests', LicensingRequestSchema);
export default LicensingRequest;