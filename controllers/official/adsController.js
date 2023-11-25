import {createToolbar} from './utilities.js';

const show = (req, res) => {
	const role = String(req.originalUrl.split('/')[1]);
	const category = req.query.category || '';
	let tableHeads = [];
	let tableData = [];
	let title = (role === 'quan') ? 'Quận' : 'Phường';
	switch (category) {
		case 'spot':
			title += ' - Điểm đặt quảng cáo';
			tableHeads = ['ID', 'Quận', 'Phường', 'Điểm đặt', 'Loại vị trí', 'Hình thức quảng cáo', 'Thông tin quy hoạch'];
			break;
		case 'board':
			title += ' - Bảng quảng cáo';
			tableHeads = ['ID', 'Quận', 'Phường', 'Điểm đặt', 'Loại bảng quảng cáo', 'Kích thước', 'Số lượng'];
			break;
		default:
			res.status(404);
			return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}

	tableData = [...Array(55).keys()].map(i => {
		let commonData = {
			id: `${category === 'spot' ? 'DD' : 'BQC'}${String(i + 1).padStart(5, '0')}`,
			district: `Quận ${(i + 1) % 13}`,
			ward: `Phường ${(i + 1) % 13}`,
			spot: `Điểm đặt ${i + 1}`,
		};
		commonData = category === 'spot'
				? {
					...commonData,
					locationType: `Loại vị trí ${i + 1}`,
					type: `Hình thức quảng cáo ${i + 1}`,
					plan: Math.random() > 0.5 ? 'Đã quy hoạch' : 'Chưa quy hoạch'
				}
				: {
					...commonData,
					type: `Loại bảng quảng cáo ${i + 1}`,
					size: `2x${i + 1}m`,
					quantity: `${i + 1} trụ/bảng`
				};
		commonData.actions = {
			edit: false,
			remove: false,
			info: true
		};
		return commonData;
	});
	const checkboxData = [...Array(13).keys()].map(i => `Phường ${i + 1}`);
	res.render('ads', {url: req.originalUrl, title, category, checkboxHeader: 'Quận 2', checkboxData, tableHeads, tableData, toolbars: createToolbar(role)});
}

const showDetail = (req, res) => {
	const role = String(req.originalUrl.split('/')[1]);
	const category = req.query.category || '';
	let title = '- Chi tiết ' + (category === 'spot' ? 'điểm đặt' : 'bảng quảng cáo');

	if (role === 'quan') {
		title = 'Quận ' + title;
	}
	if (role === 'phuong') {
		title = 'Phường ' + title;
	}

	const data = {
		spotTitle: 'ĐỒNG KHỞI - NGUYỄN DU, SỞ VĂN HÓA VÀ THỂ THAO',
		spotId: req.params.id,
		address: '227 Nguyễn Văn Cừ',
		ward: 'Bến Nghé',
		district: 'Quận 1',
		locationType: 'Đất công/Công viên/Hành lang an toàn giao thông',
		adsType: 'Quảng cáo thương mại',
		plan: 'Đã quy hoạch',
		imgUrls: [
			'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%201',
			'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%202',
			'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%203',
			'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%204',
			'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%205',
			'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%206'
		],
	}

	const boardsTableHeads = ['ID', 'Loại bảng quảng cáo', 'Kích thước', 'Số lượng'];
	const boardsTableData = [...Array(3).keys()].map(i => {
		return {
			id: `BQC${String(i + 1).padStart(5, '0')}`,
			type: 'Trụ bảng Hiflex',
			size: `2x${i + 1}m`,
			quantity: `${i + 1} trụ/bảng`,
			actions: {
				edit: false,
				remove: false,
				info: true
			}
		}
	});

	res.render(`${category}-detail`, {
		url: req.originalUrl,
		title, ...data,
		boardsTableHeads,
		boardsTableData,
		toolbars: createToolbar(role)
	});
}

const showAdd = (req, res) => {
	const role = String(req.originalUrl.split('/')[1]);
	const category = req.query.category || '';
	let title = '- Thêm ' + (category === 'spot' ? 'điểm đặt' : 'bảng quảng cáo');
	if (role === 'quan') {
		title = 'Quận ' + title;
	}
	if (role === 'phuong') {
		title = 'Phường ' + title;
	}
	res.render(`${category}-new`, {url: req.originalUrl, title, toolbars: createToolbar(role)});
}

const showModify = (req, res) => {
	const role = String(req.originalUrl.split('/')[1]);
	const category = req.query.category || '';
	let title = 'Phường - Chỉnh sửa ' + (category === 'spot' ? 'điểm đặt' : 'bảng quảng cáo');
	if (role === 'quan') {
		title = 'Quận ' + title;
	}
	if (role === 'phuong') {
		title = 'Phường ' + title;
	}
	res.render(`${category}-modify`, {url: req.originalUrl, title, toolbars: createToolbar(role)});
}

export default {
	show,
	showAdd,
	showDetail,
	showModify
};