import mongoose from "mongoose";

const OfficerSchema = new mongoose.Schema({
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

const Officer = mongoose.model('officers', OfficerSchema);
export default Officer;