import {toolbars} from './utilities.js';
import {licensingRequestService, editRequestService} from '../../services/requestService.js';

const controller = {};

controller.show = async (req, res) => {
	const category = req.query.category || '';
	let tableHeads = [];
	let tableData = [];
	let title = '';
	if (category === 'license') {
		tableHeads = ['ID Yêu cầu', 'ID Điểm đặt', 'Phường', 'Quận', 'Cán bộ', 'Thời gian quảng cáo', 'Trạng thái'];
		tableData = await licensingRequestService.getAll();
		tableData = tableData.map(request => ({
			id: request.requestID,
			point_id: request.spotID,
			ward: request.wardName,
			district: request.districtName,
			officer: request.officerUsername,
			time: `${request.startDate.toLocaleDateString('vi-VN')} - ${request.endDate.toLocaleDateString('vi-VN')}`,
			status: request.status === 0 ? 'Đang chờ duyệt' : request.status === 1 ? 'Đã duyệt' : 'Đã từ chối',
			actions: {
				edit: false,
				remove: false,
				info: true
			}
		}));


		title = 'Sở - Yêu cầu cấp phép';
	} else if (category === 'modify') {
		tableHeads = ['ID Yêu cầu', 'ID Điểm đặt', 'Phường', 'Quận', 'Cán bộ', 'Tóm tắt chỉnh sửa', 'Trạng thái'];
		tableData = await editRequestService.getAll();
		tableData = tableData.map(request => ({
			id: request.requestID,
			point_id: request.objectID,
			ward: request.wardName,
			district: request.districtName,
			officer: request.officerUsername,
			reason: request.reason,
			status: request.status === 0 ? 'Đang chờ duyệt' : request.status === 1 ? 'Đã duyệt' : 'Đã từ chối',
			actions: {
				edit: false,
				remove: false,
				info: true
			}
		}));
		title = 'Sở - Yêu cầu chỉnh sửa';
	} else {
		res.status(404);
		return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}
	return res.render('./so/requests', {url: req.originalUrl, title, category, tableHeads, tableData, toolbars});
}

controller.showDetail = (req, res) => {
	const title = 'Sở - Chi tiết yêu cầu';
	const category = req.query.category || '';
	if (category !== 'license' && category !== 'modify') {
		res.status(404);
		return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}
	console.log(req.params.id);
	return res.render('./so/request-detail', {title, toolbars, id: req.params.id});
}

export default controller;