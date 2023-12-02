import { toolbars } from './utilities.js';

const show = (req, res) => {
	const category = req.query.category || '';
	let tableHeads = [];
	let tableData = [];
	let title = 'Sở - ';
	let checkboxData = [...Array(13).keys()].map(i => {
		return 'Quận ' + (i + 1);
	});
	switch (category) {
		case 'spot':
			title = 'Sở - Điểm đặt';
			tableHeads = ['ID', 'Quận', 'Phường', 'Điểm đặt', 'Loại vị trí', 'Hình thức quảng cáo', 'Thông tin quy hoạch'];
			break;
		case 'board':
			title = 'Sở - Bảng quảng cáo';
			tableHeads = ['ID', 'Quận', 'Phường', 'Điểm đặt', 'Loại bảng quảng cáo', 'Kích thước', 'Số lượng'];
			break;
		default:
			res.status(404);
			return res.render('error', { error: { status: 404, message: 'Không tìm thấy trang' } });
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
	}
	);
	res.render('ads', { url: req.originalUrl, title, category, tableHeads, tableData, checkboxHeader: 'THÀNH PHỐ HỒ CHÍ MINH', checkboxData, toolbars });
};

const showDetail = (req, res) => {
	const category = req.query.category || '';
	const title = 'Sở - Chi tiết ' + (category === 'spot' ? 'điểm đặt' : 'bảng quảng cáo');

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
		toolbars
	});
}

const showAdd = (req, res) => {
	const category = req.query.category || '';
	switch (category) {
		case 'spot':
			res.render('spot-new', {url: req.originalUrl, title: 'Sở - Điểm đặt mới', toolbars: toolbars});
			break;
		case 'board':
			res.render('board-new', {url: req.originalUrl, title: 'Sở - Bảng quảng cáo mới', toolbars: toolbars});
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
			res.render('spot-modify', {url: req.originalUrl, title: 'Sở - Chỉnh sửa điểm đặt', toolbars: toolbars});
			break;
		case 'board':
			res.render('board-modify', {url: req.originalUrl, title: 'Sở - Chỉnh sửa bảng quảng cáo', toolbars: toolbars});
			break;
		default:
			res.status(404);
			return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}
}

export default {
	show,
	showDetail,
	showAdd,
	showModify
}