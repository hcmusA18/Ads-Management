import mongoose from "mongoose";

const ReportTypeSchema = new mongoose.Schema({
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

const ReportType = mongoose.model('reportTypes', ReportTypeSchema);
export default ReportType;