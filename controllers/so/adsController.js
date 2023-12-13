import { toolbars } from './utilities.js';
import * as spotService from '../../services/spotService.js';
import * as boardService from '../../services/boardService.js';
import * as districtService from '../../services/districtService.js';

const show = async (req, res) => {
    const category = req.query.category || '';
    let tableHeads = [];
    let tableData = [];
    let title = 'Sở - ';
	
	let checkboxData = await districtService.getAllDistricts();
	checkboxData = checkboxData.map((dist) => `Quận ${dist.districtName}`);

    try {
        switch (category) {
            case 'spot':
                title = 'Sở - Điểm đặt';
                tableHeads = ['ID', 'Quận', 'Phường', 'Điểm đặt', 'Loại vị trí', 'Hình thức quảng cáo', 'Thông tin quy hoạch'];
                tableData = await spotService.getAllSpots();
				tableData = tableData.map(spot => ({
					id: spot.spotID,
					district: spot.districtName,
					ward: spot.wardName,
					spot: spot.spotName,
					locationType: spot.spotTypeName,
					type: spot.adsFormName,
					plan: spot.planned === 1 ? 'Đã quy hoạch' : 'Chưa quy hoạch',
					actions: {
						edit: false,
						remove: false,
						info: true
					}
				}));
				current = 0;

                break;
            case 'board':
                title = 'Sở - Bảng quảng cáo';
                tableHeads = ['ID', 'Quận', 'Phường', 'Điểm đặt', 'Loại bảng quảng cáo', 'Kích thước', 'Số lượng'];
                tableData = await boardService.getAllBoards();
				tableData = tableData.map(board => ({
					id: board.boardID,
					district: board.districtName,
					ward: board.wardName,
					spot: board.spotName,
					type: board.boardTypeName,
					size: `${board.width}x${board.height}m`,
					quantity: `${board.quantity} trụ / bảng`,
					actions: {
						edit: false,
						remove: false,
						info: true
					}
				}));
				current = 1;
                break;
            default:
                res.status(404);
                return res.render('error', { error: { status: 404, message: 'Không tìm thấy trang' } });
        }

        res.render('ads', { url: req.originalUrl, title, category, tableHeads, tableData, checkboxHeader: 'THÀNH PHỐ HỒ CHÍ MINH', checkboxData, toolbars, current });
    } catch (error) {
        // Handle errors (e.g., log them or render an error page)
        console.error(error);
        res.status(500).render('error', { error: { status: 500, message: 'Lỗi server' } });
    }
};

const showDetail = async (req, res) => {
	const category = req.query.category || '';
	const title = 'Sở - Chi tiết ' + (category === 'spot' ? 'điểm đặt' : 'bảng quảng cáo');
	const id = req.params.id || '';
	const isSpotCategory = (category === 'spot' ? 'điểm đặt' : 'bảng quảng cáo');

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
	};

	const getDataObject = (category == 'spot' ? spotService.getSpotByID : boardService.getBoardByID);
	const object = await getDataObject(id);

	// {
	// 	spotID: 'DD0001',
	// 	address: '887 Trần Hưng Đạo',
	// 	districtID: 'Q0005',
	// 	wardID: 'P00501',
	// 	spotType: 'VT004',
	// 	planned: 0,
	// 	spotName: 'Nhà hàng Sài Gòn 2',
	// 	spotImage: [
	// 	  'https://drive.google.com/uc?export=view&id=18-945o400Cg8VZ-gNP3NKCurRbCpaga0',
	// 	  'https://drive.google.com/uc?export=view&id=1aqXkU6onBekkS4PNtJqil4R7SUTaZfVP'
	// 	],
	// 	spotTypeName: 'Chợ',
	// 	districtName: '05',
	// 	wardName: '01',
	// 	adsFormName: 'Cổ động chính trị'
	//   }
	if (isSpotCategory) {
		console.log(object);
	} else {
		data.id = id;
		data.spotTitle = object.spotName;
		data.spotID = object.spotID;
		data.address = object.address;
		data.ward = object.districtName;
		data.district = object.districtName;
		data.locationType = object.spotTypeName;
		data.adsType = object.adsFormName;
		data.plan = object.planned === 1 ? 'Đã quy hoạch' : 'Chưa quy hoạch';
		data.imgUrls = object.imgUrls;
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