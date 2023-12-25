import mongoose from 'mongoose';

const SpotTypeSchema = new mongoose.Schema({
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

const SpotType = mongoose.model('spotTypes', SpotTypeSchema);
export default SpotType;