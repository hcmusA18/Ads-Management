import {createToolbar} from './utilities.js';
import {getRoleByUsername} from '../../services/officerService.js';
import {getReportByOfficerRole, getReportByID, updateReportByID} from '../../services/reportService.js';

const convertDate = (date) => {
	const dateObject = new Date(date);

	const day = dateObject.getDate().toString().padStart(2, '0');
	const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
	const year = dateObject.getFullYear();

	return `${day}/${month}/${year}`;
}

const show = async (req, res) => {
	const role = String(req.originalUrl.split('/')[1]);
	let title = role === 'quan' ? 'Quận - Quản lý báo cáo vi phạm' : 'Phường - Quản lý báo cáo vi phạm';
	// console.log(req.user.username);
	const officerRole = await getRoleByUsername(req.user.username);
	// console.log(officerRole);
	const data = await getReportByOfficerRole(officerRole);
	// console.log(data);
	// convertDate('2023-02-07T17:00:00.000Z');
	const roleData = {
		quan: {
			tableHeads: ['ID Báo Cáo', 'ID DD / QC', 'Loại hình báo cáo', 'Phường'
				, 'Họ tên người gửi', 'Email', 'Thời điểm gửi', 'Trạng thái'],
			tableData: data.map((item) => {
				return {
					id: item.reportID,
					objectID: item.objectID,
					reportType: item.reportType,
					ward: item.wardName,
					reporterName: item.reporterName,
					reporterEmail: item.reporterEmail,
					sendTime: convertDate(item.sendTime),
					state: item.status === 1 ? "Đã xử lí" : "Đang xử lí",
					actions: {
						edit: false,
						remove: false,
						info: true
					}
				}
			}),
			checkboxData: [...Array(13).keys()].map(i => `Phường ${i + 1}`),
			checkboxHeader: 'QUẬN 2',
		},
		phuong: {
			tableHeads: ['ID Báo Cáo', 'ID DD / QC', 'Loại hình báo cáo',
				'Họ tên người gửi', 'Email', 'Thời điểm gửi', 'Trạng thái'],
			tableData: data.map((item) => {
				return {
					id: item.reportID,
					objectID: item.objectID,
					reportType: item.reportType,
					reporterName: item.reporterName,
					reporterEmail: item.reporterEmail,
					sendTime: convertDate(item.sendTime),
					state: item.status === 1 ? "Đã xử lí" : "Đang xử lí",
					actions: {
						edit: false,
						remove: false,
						info: true
					}
				}
			}),
		},
	}

	const roleInfo = roleData[role];
	if (!roleInfo) {
		res.status(404);
		return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}
	res.render('reports', {url: req.originalUrl, title: title, ...roleInfo, toolbars: createToolbar(role)});
}

const showDetail = async (req, res) => {
	const role = String(req.originalUrl.split('/')[1]);
	const reportID = req.params.id;
	const dataFetch = await getReportByID(reportID);
	// console.log(dataFetch);
	let title = role === 'quan' ? 'Quận - Chi tiết báo cáo vi phạm' : 'Phường - Chi tiết báo cáo vi phạm';

	const data = {
		id: dataFetch.reportID,
		phone: dataFetch.reporterPhone,
		state: dataFetch.status,
		objectID: dataFetch.objectID,
		reportType: dataFetch.reportTypeName,
		sendTime: convertDate(dataFetch.sendTime),
		name: dataFetch.reporterName,
		email: dataFetch.reporterEmail,
		content: dataFetch.reportInfo,
		solution: dataFetch.solution,
		imgUrls: [...dataFetch.reportImages],
	}
	res.render('report-detail', {role, title, toolbars: createToolbar(role), ...data});
}

const updateReport = async (req, res) => {
	const reportID = req.params.id;
	const dataToUpdate = req.body;
	
	// console.log(reportID);
	// console.log(dataToUpdate);

	try {
		const message = await updateReportByID(reportID, dataToUpdate);
		console.log(message);
		res.redirect('/phuong/reports');
	} catch (error) {
		console.log(error.message);
		req.flash('error', error.message);
	}
}

export default {
	show,
	showDetail,
	updateReport,
};