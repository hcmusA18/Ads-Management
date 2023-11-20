import mongoose from "mongoose";

const DistrictSchema = new mongoose.Schema({
    districtID: {
        type: String,
        required: true,
        unique: true
    },
    districtName: {
        type: String,
        required: true
    }
});

const District = mongoose.model('districts', DistrictSchema);
export default District;