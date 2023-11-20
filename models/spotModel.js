import mongoose from "mongoose";

const SpotSchema = new mongoose.Schema({
    spotID: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    districtID: {
        type: String,
        required: true
    },
    wardID: {
        type: String,
        required: true
    },
    spotType: {
        type: String,
        required: true
    },
    adsForm: {
        type: String,
        required: true
    },
    spotImage: {
        type: String,
        required: true
    },
    planned: {
        type: Number,
        required: true
    }
});

const Spot = mongoose.model('spots', SpotSchema);
export default Spot;