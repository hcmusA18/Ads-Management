import mongoose from "mongoose";

const AdsFormSchema = new mongoose.Schema({
    formID: {
        type: String,
        required: true,
        unique: true
    },
    formName: {
        type: String,
        required: true
    }
});

const AdsForm = mongoose.model('adsForms', AdsFormSchema);
export default AdsForm;