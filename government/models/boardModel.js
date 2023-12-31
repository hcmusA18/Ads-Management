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
        type: Array,
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
    quantity: {
        type: Number,
        require: true,
    },
    licensingID: {
        type: String,
    }
});

const Board = mongoose.model('boards', BoardSchema);
export default Board;