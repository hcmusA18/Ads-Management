import {toolbars} from './utilities.js';

const controller = {};

controller.show = (req, res) => {
	const category = req.query.category || '';
	let tableHeads = [];
	let tableData = [];
	let title = '';
	if (category === 'license') {
		tableHeads = ['ID Yêu cầu', 'ID Điểm đặt', 'Phường', 'Quận', 'Cán bộ', 'Thời gian quảng cáo', 'Trạng thái'];
		tableData = [...Array(55).keys()].map(i => {
			return {
				id: i + 1,
				point_id: `DD${i + 1}`,
				ward: `Phường ${i + 1}`,
				district: `Quận ${i + 1}`,
				officer: `Cán bộ ${i + 1}`,
				time: '1/1/2021 - 1/1/2022',
				status: 'Đang chờ duyệt',
				actions: {
					edit: false,
					remove: false,
					info: true
				}
			}
		});
		title = 'Sở - Yêu cầu cấp phép';
	} else if (category === 'modify') {
		tableHeads = ['ID Yêu cầu', 'ID Điểm đặt', 'Phường', 'Quận', 'Cán bộ', 'Tóm tắt chỉnh sửa', 'Trạng thái'];
		tableData = [...Array(55).keys()].map(i => {
			return {
				id: i + 1,
				point_id: `DD${i + 1}`,
				ward: `Phường ${i + 1}`,
				district: `Quận ${i + 1}`,
				officer: `Cán bộ ${i + 1}`,
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae tincidunt ultricies, nunc nisl ultricies nunc, vitae ultricies',
				status: 'Đang chờ duyệt',
				actions: {
					edit: false,
					remove: false,
					info: true
				}
			}
		});
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