import mongoose from "mongoose";

const OfficierSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    districtID: {
        type: String
    },
    wardID: {
        type: String
    }
});

const Officier = mongoose.model('officiers', OfficierSchema);
export default Officier;