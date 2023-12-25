import mongoose from 'mongoose';

const WardSchema = new mongoose.Schema({
    wardID: {
        type: String,
        required: true,
        unique: true
    },
    wardName: {
        type: String,
        required: true
    },
    districtID: {
        type: String,
        required: true
    }
});

const Ward = mongoose.model('wards', WardSchema);
export default Ward;