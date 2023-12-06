import {toolbars} from './utilities.js';
import * as reportService from '../../services/reportService.js';
const controller = {};

controller.show = async (req, res) => {
	let tableData = [];
	const tableHeads = ['ID Báo cáo', 'ID Điểm/Bảng QC', 'Loại hình', 'Người gửi', 'Email', 'Ngày gửi', 'Trạng thái'];
	tableData = await reportService.getAllReports();
	tableData = tableData.map(report => ({
		id: report.reportID,
		ads_id: report.objectID,
		ads_type: report.reportTypeName,
		sender: report.reporterName,
		email: report.reporterEmail,
		date: report.sendTime.toLocaleDateString('vi-VN'),
		status: report.status === 0 ? 'Đang chờ duyệt' : report.status === 1 ? 'Đã duyệt' : 'Đã từ chối',
		actions: {
			edit: false,
			remove: false,
			info: true
		}
	}));

	const title = 'Sở - Thống kê báo cáo';
	return res.render('./so/reports', {title, tableHeads, tableData, toolbars});
}

controller.showDetail = async (req, res) => {
	const id = req.params.id;
	let data = {};
	data = await reportService.getReportByID(id);
	const detail = {
		id: data.reportID,
		ads_id: data.objectID,
		ads_type: data.reportTypeName,
		sender: data.reporterName,
		phone: data.reporterPhone,
		email: data.reporterEmail,
		report_type: data.reportTypeName,
		date: data.sendTime.toLocaleDateString('vi-VN'),
		state: data.status === 0 ? 'Đang chờ duyệt' : data.status === 1 ? 'Đã duyệt' : 'Đã từ chối',
		content: data.reportInfo,
		solution: data.solution,
		images: data.reportImages
	}
	const title = 'Sở - Chi tiết báo cáo';
	return res.render('./so/report-detail', {title, detail, toolbars});
}

export default controller;