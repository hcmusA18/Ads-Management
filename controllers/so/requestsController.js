import {toolbars} from './utilities.js';

const controller  = {};

controller.show = (req, res) => {
	const category = req.query.category || '';
	let table_header = [];
	let table_data = [];
	let title = '';
	if (category === 'license') {
		table_header = ['ID Yêu cầu', 'ID Điểm đặt', 'Phường', 'Quận', 'Cán bộ', 'Thời gian quảng cáo', 'Trạng thái'];
		table_data = [...Array(55).keys()].map(i => {
			return {
				id: i + 1,
				point_id: `DD${i + 1}`,
				ward: `Phường ${i + 1}`,
				district: `Quận ${i + 1}`,
				officer: `Cán bộ ${i + 1}`,
				time: '1/1/2021 - 1/1/2022',
				status: 'Đang chờ duyệt'
			}
		});
		title = 'Sở - Yêu cầu cấp phép';
	} else if (category === 'modify') {
		table_header = ['ID Yêu cầu', 'ID Điểm đặt', 'Phường', 'Quận', 'Cán bộ', 'Tóm tắt chỉnh sửa', 'Trạng thái'];
		table_data = [...Array(55).keys()].map(i => {
			return {
				id: i + 1,
				point_id: `DD${i + 1}`,
				ward: `Phường ${i + 1}`,
				district: `Quận ${i + 1}`,
				officer: `Cán bộ ${i + 1}`,
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae tincidunt ultricies, nunc nisl ultricies nunc, vitae ultricies',
				status: 'Đang chờ duyệt'
			}
		});
		title = 'Sở - Yêu cầu chỉnh sửa';
	} else {
		res.status(404);
		return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}
	return res.render('./so/requests', { title, table_header, table_data, toolbars});
}

controller.showDetail = (req, res) => {	return res.render('./so/request-detail', { title: 'Sở - Chi tiết yêu cầu', toolbars: toolbars, id: req.params.id });
}

export default controller;