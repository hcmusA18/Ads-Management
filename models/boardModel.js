import mongoose from 'mongoose';

const BoardSchema = new mongoose.Schema({
    boardID: {
        type: String,
        required: true,
        unique: true
    },
    boardType: {
        type: String,
        required: true
    },
    spotID: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    licensingID: {
        type: String,
        required: true
    }
});

const Board = mongoose.model('boards', BoardSchema);
export default Board;