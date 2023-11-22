import {toolbars} from './utilities.js';

const show = (req, res) => {
	const category = req.query.category || '';
	let tableHeads = [];
	let tableData = [];
	let title = '';
	switch (category) {
		case 'spot':
			title = 'Phường - Điểm đặt';
			tableHeads = ['ID', 'Quận', 'Phường', 'Điểm đặt', 'Loại vị trí', 'Hình thức quảng cáo', 'Thông tin quy hoạch'];
			tableData = [...Array(55).keys()].map(i => {
				return {
					id: 'DD' + String(i + 1).padStart(5, '0'),
					district: `Quận ${(i + 1) % 13}`,
					ward: `Phường ${(i + 1) % 13}`,
					spot: `Điểm đặt ${i + 1}`,
					locationType: `Loại vị trí ${i + 1}`,
					type: `Hình thức quảng cáo ${i + 1}`,
					plan: Math.random() > 0.5 ? 'Đã quy hoạch' : 'Chưa quy hoạch',
					actions: {
						edit: false,
						remove: false,
						info: true
					}
				}
			});
			break;
		case 'board':
			title = 'Phường - Bảng quảng cáo';
			tableHeads = ['ID', 'Quận', 'Phường', 'Điểm đặt', 'Loại bảng quảng cáo', 'Kích thước', 'Số lượng'];
			tableData = [...Array(55).keys()].map(i => {
				return {
					id: 'BQC' + String(i + 1).padStart(5, '0'),
					district: `Quận ${(i + 1) % 13}`,
					ward: `Phường ${(i + 1) % 13}`,
					spot: `Điểm đặt ${i + 1}`,
					type: `Loại bảng quảng cáo ${i + 1}`,
					size: `2x${i + 1}m`,
					quantity: `${i + 1} trụ/bảng`,
					actions: {
						edit: false,
						remove: false,
						info: true
					}
				}
			});
			break;
		default:
			res.status(404);
			return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}
	res.render('ads', {url: req.originalUrl, title, category, tableHeads, tableData, toolbars});
}

const showDetail = (req, res) => {
	const category = req.query.category || '';
	switch (category) {
		case 'spot':
			res.render('spot-detail', {url: req.originalUrl, title: 'Phường - Chi tiết điểm đặt', toolbars: toolbars});
			break;
		case 'board':
			res.render('board-detail', {url: req.originalUrl, title: 'Phường - Chi tiết bảng quảng cáo', toolbars: toolbars});
			break;
		default:
			res.status(404);
			return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}
}

const showAdd = (req, res) => {
	const category = req.query.category || '';
	switch (category) {
		case 'spot':
			res.render('spot-new', {url: req.originalUrl, title: 'Phường - Điểm đặt mới', toolbars: toolbars});
			break;
		case 'board':
			res.render('board-new', {url: req.originalUrl, title: 'Phường - Bảng quảng cáo mới', toolbars: toolbars});
			break;
		default:
			res.status(404);
			return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}
}

const showModify = (req, res) => {
	const category = req.query.category || '';
	switch (category) {
		case 'spot':
			res.render('spot-modify', {url: req.originalUrl, title: 'Phường - Chỉnh sửa điểm đặt', toolbars: toolbars});
			break;
		case 'board':
			res.render('board-modify', {url: req.originalUrl, title: 'Phường - Chỉnh sửa bảng quảng cáo', toolbars: toolbars});
			break;
		default:
			res.status(404);
			return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}
}

export default {
	show,
	showAdd,
	showDetail,
	showModify
};