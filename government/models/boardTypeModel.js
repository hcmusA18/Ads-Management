import mongoose from "mongoose";

const BoardTypeSchema = new mongoose.Schema({
    typeID: {
        type: String,
        required: true,
        unique: true
    },
    typeName: {
        type: String,
        required: true
    }
});

const BoardType = mongoose.model('boardTypes', BoardTypeSchema);
export default BoardType;