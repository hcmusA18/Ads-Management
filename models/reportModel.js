import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
    reportID: {
        type: String,
        unique: true
    },
    objectID: {
        type: String,
        required: true
    },
    reportImages: {
        type: [String],
        required: true
    },
    reportType: {
        type: String,
        required: true
    },
    reporterName: {
        type: String,
        required: true
    },
    reporterEmail: {
        type: String,
        required: true
    },
    reporterPhone: {
        type: String,
        required: true
    },
    sendTime: {
        type: Date,
    },
    reportInfo: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    solution: {
        type: String
    },
    officerName: {
        type: String,
    }
});

ReportSchema.pre('save', async function  (next) {
    const report = this;
    const count = await Report.countDocuments();
    report.reportID = 'BC' + String(count + 1).padStart(4, '0');
    const formatter = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
    report.sendTime = formatter.format(Date.now());
    next();
});

const Report = mongoose.model('reports', ReportSchema);
export default Report;