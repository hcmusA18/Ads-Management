import mongoose from "mongoose";

const ReportTypeSchema = new mongoose.Schema({
    typeID: {
        type: String,
        unique: true
    },
    typeName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
});

ReportTypeSchema.pre('save', async function (next) {
    const reportType = this;
    const reportTypeCount = await ReportType.countDocuments();
    reportType.typeID = 'HTBC' + String(reportTypeCount + 1).padStart(3, '0');
    next();
});

const ReportType = mongoose.model('reportTypes', ReportTypeSchema);
export default ReportType;