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
    reason: {
        type: String,
    },
});

LicensingRequestSchema.pre('save', function (next) {
    const request = this;
    // generate requestID based on spotID
    request.requestID = 'CP' + (request.spotID.slice(2) + Math.floor(Math.random() * 100000)).toString().padStart(5, '0');
    request.status = 0;
    request.updatedAt = Date.now();
    next();
});

const LicensingRequest = mongoose.model('licensingRequests', LicensingRequestSchema);
export default LicensingRequest;