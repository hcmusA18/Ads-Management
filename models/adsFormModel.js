import mongoose from "mongoose";

const AdsFormSchema = new mongoose.Schema({
    formID: {
        type: String,
        unique: true
    },
    formName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// auto increment for formID
AdsFormSchema.pre('save', async function (next) {
    const adsForm = this;
    const adsFormCount = await AdsForm.countDocuments();
    adsForm.formID = 'HT' + String(adsFormCount + 1).padStart(3, '0');
    next();
});

const AdsForm = mongoose.model('adsforms', AdsFormSchema);
export default AdsForm;