import mongoose from 'mongoose';

const SpotSchema = new mongoose.Schema({
    spotID: {
        type: String,
        required: true,
        unique: true
    },
    spotName: {
        type: String,
        required: true
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

SpotSchema.pre('save', async function (next) {
    const spot = this;
    const spotCount = await Spot.countDocuments();
    spot.spotID = 'DD' + String(spotCount + 1).padStart(4, '0');
    spot.updatedAt = Date.now();
    next();
});

const Spot = mongoose.model('spots', SpotSchema);

export default Spot;