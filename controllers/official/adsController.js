import {createToolbar} from './utilities.js';
import * as spotService from '../../services/spotService.js';
import * as boardService from '../../services/boardService.js';
import * as wardService from '../../services/wardService.js';
import * as districtService from '../../services/districtService.js';

const show = async (req, res) => {
  const role = String(req.originalUrl.split('/')[1])
  const category = req.query.category || ''
  let tableHeads = []
  let tableData = []
  let title = role === 'quan' ? 'Quận' : 'Phường'
  let checkboxHeader = ''

  if (role === 'quan') {
    checkboxHeader = await districtService.getDistrictByID(req.user.districtID)
    if (checkboxHeader) checkboxHeader = 'Quận ' + checkboxHeader.districtName
    else checkboxHeader = 'Không có thông tin quận'
  }
  else if (role === 'phuong') {
    checkboxHeader = await wardService.getWardByID(req.user.wardID)
    if (checkboxHeader) checkboxHeader = 'Phường ' + checkboxHeader.wardName
    else checkboxHeader = 'Không có thông tin phường'
  }

  switch (category) {
    case 'spot':
      title += ' - Điểm đặt quảng cáo'
      if (role === 'quan')
        tableHeads = ['ID', 'Phường', 'Điểm đặt', 'Loại vị trí', 'Hình thức quảng cáo', 'Thông tin quy hoạch']
      else if (role === 'phuong')
        tableHeads = ['ID', 'Điểm đặt', 'Loại vị trí', 'Hình thức quảng cáo', 'Thông tin quy hoạch']
      break
    case 'board':
      title += ' - Bảng quảng cáo'
      if (role === 'quan') tableHeads = ['ID', 'Phường', 'Điểm đặt', 'Loại bảng quảng cáo', 'Kích thước', 'Số lượng']
      else if (role === 'phuong') tableHeads = ['ID', 'Điểm đặt', 'Loại bảng quảng cáo', 'Kích thước', 'Số lượng']
      break
    default:
      res.status(404)
      return res.render('error', { error: { status: 404, message: 'Không tìm thấy trang' } })
  }

  const getSpotTableData = async (spots, role) => {
    return spots.map((spot) => ({
      id: spot.spotID,
      ward: role === 'quan' ? spot.wardName : undefined,
      spot: spot.spotName,
      locationType: spot.spotTypeName,
      type: spot.adsFormName,
      plan: spot.planned === 1 ? 'Đã quy hoạch' : 'Chưa quy hoạch',
      actions: {
        edit: false,
        remove: false,
        info: true
      }
    }))
  }

  const getBoardTableData = async (boards, role) => {
    return boards.map((board) => ({
      id: board.boardID,
      ward: role === 'quan' ? board.wardName : undefined,
      spot: board.spotName,
      type: board.boardTypeName,
      size: `${board.height}x${board.width}m`,
      quantity: `${board.quantity} trụ/bảng`,
      actions: {
        edit: false,
        remove: false,
        info: true
      }
    }))
  }

  if (category === 'spot') {
    if (role === 'quan') {
      tableData = await getSpotTableData(await spotService.getSpotsByDistrictID(req.user.districtID), role)
    } else if (role === 'phuong') {
      tableData = await getSpotTableData(await spotService.getSpotsByWardID(req.user.wardID), role)
    }
  } else {
    if (role === 'quan') {
      tableData = await getBoardTableData(await boardService.getBoardsByDistrictID(req.user.districtID), role)
    } else if (role === 'phuong') {
      tableData = await getBoardTableData(await boardService.getBoardsByWardID(req.user.wardID), role)
    }
  }

  let checkboxData = []
  if (role === 'quan') {
    checkboxData = await wardService.getWardsOfDistrict(req.user.districtID)
    checkboxData = checkboxData.map((ward) => `Phường ${ward.wardName}`);
  }

  res.render('ads', {
    url: req.originalUrl,
    title,
    category,
    checkboxHeader,
    checkboxData,
    tableHeads,
    tableData,
    toolbars: createToolbar(role),
  })
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