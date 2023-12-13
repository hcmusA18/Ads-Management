import {createToolbar} from './utilities.js';
import * as adsFromsService from '../../services/adsFormService.js';
import * as spotService from '../../services/spotService.js';
import * as spotTypeService from '../../services/spotTypeService.js';
import * as boardService from '../../services/boardService.js';
import * as wardService from '../../services/wardService.js';
import * as districtService from '../../services/districtService.js';
import * as editRequestService from '../../services/editRequestService.js';

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

const showDetail = async (req, res, isEdit) => {
  const ID = req.params.id;
  const role = String(req.originalUrl.split('/')[1]);
  const category = req.query.category || '';
  const isSpotCategory = category === 'spot';
  let title = '';
  if (isEdit) 
    title = `${role === 'quan' ? 'Quận ' : role === 'phuong' ? 'Phường ' : '-'} Chỉnh sửa ${isSpotCategory ? 'điểm đặt' : 'bảng quảng cáo'}`;
  else 
    title = `${role === 'quan' ? 'Quận ' : role === 'phuong' ? 'Phường ' : '-'} Chi tiết ${isSpotCategory ? 'điểm đặt' : 'bảng quảng cáo'}`;

  const getData = isSpotCategory ? spotService.getSpotByID : boardService.getBoardByID;
  const detailData = await getData(ID);

  const commonData = {
    url: req.originalUrl,
    title,
    toolbars: createToolbar(role),
  };

  if (isSpotCategory) {
    const { spotName, address, wardName, districtName, spotTypeName, adsFormName, planned, spotImage } = detailData;
    const data = {
      spotTitle: spotName,
      spotId: ID,
      address,
      ward: wardName,
      district: districtName,
      locationType: spotTypeName,
      adsType: adsFormName,
      plan: planned === 1 ? 'Đã quy hoạch' : 'Chưa quy hoạch',
      imgUrls: spotImage,
    };

    const boardsTableHeads = ['ID', 'Loại bảng quảng cáo', 'Kích thước', 'Số lượng'];
    const boardsTableData = (!isEdit)? await boardService.getBoardsOfSpot(ID) : [];
    const transformedBoardsTableData = boardsTableData.map((board) => ({
      id: board.boardID,
      type: board.boardTypeName,
      size: `${board.height}x${board.width}m`,
      quantity: `${board.quantity} trụ/bảng`,
      actions: { edit: false, remove: false, info: true },
    }));

    if (isEdit) {
      let other = {}
      other.spottypes = await spotTypeService.getAllSpotTypes() || [];
      other.adsforms = await adsFromsService.getAllAdsForms() || [];
      res.render('spot-modify', { ...commonData, ...data, other });
    } else {
      res.render('spot-detail', { ...commonData, ...data, boardsTableHeads, boardsTableData: transformedBoardsTableData });
    }
  } else {
    const data = {
      id: detailData.boardID,
      spotID: detailData.spotID,
      spotAddress: detailData.spotAddress,
      authCompany: detailData.authCompany,
      authCompanyAddress: detailData.authCompanyAddress,
      authCompanyPhone: detailData.authCompanyPhone,
      authCompanyEmail: detailData.authCompanyEmail,
      startDate: detailData.startDate.toLocaleDateString('vi-VN'),
      endDate: detailData.endDate.toLocaleDateString('vi-VN'),
      boardTypeName: detailData.boardTypeName,
      quantity: detailData.quantity,
      size: `${detailData.height}x${detailData.width}m`,
      spotTypeName: detailData.spotTypeName,
      adsFormName: detailData.adsFormName,
      imgUrls: detailData.image,
    };

    if (isEdit) {
      let spots = []
      if (role === 'quan') {
        spots = await spotService.getSpotsByDistrictID(req.user.districtID);
      } else if (role === 'phuong') {
        spots = await spotService.getSpotsByWardID(req.user.wardID);
      }
      // console.log('====================================');
      // console.log(spots);
      // console.log('====================================');
      res.render('board-modify', { ...commonData, ...data, spots });
    } else {
      res.render('board-detail', { ...commonData, ...data });
    }
  }
};


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


// ... Khong xai ...
// Gop chung voi show detail
const showModify = (req, res) => {
	const role = String(req.originalUrl.split('/')[1]);
	const category = req.query.category || '';
	let title = 'Chỉnh sửa ' + (category === 'spot' ? 'điểm đặt' : 'bảng quảng cáo');
	if (role === 'quan') {
		title = 'Quận ' + title;
	}
	if (role === 'phuong') {
		title = 'Phường ' + title;
	}
	res.render(`${category}-modify`, {url: req.originalUrl, title, toolbars: createToolbar(role)});
}
// ..................

const request = async (req, res) => {
  try {
		let data = req.body;
    const { reason, officerUsername, ...rest } = data;
    data = {
      requestID: 'CS1111',
      requestTime: new Date(),
      objectID: data.spotID,
      reason: reason,
      newInfo: rest,
      status: 0,
      officerUsername: officerUsername,
    }
    // console.log(data);
		let { message } = await editRequestService.create(data);
		console.log(`Message: ${message}`);
		req.flash('success', message);
    res.locals.message = req.flash();
		return res.redirect(req.originalUrl);
	} catch (error) {
    console.log(`Error sending edit request: ${error.message}`);
		req.flash('error', error.message);
    res.locals.message = req.flash();
		return res.redirect(req.originalUrl);
	}
}

export default {
	show,
	showAdd,
	showDetail,
	showModify,
  request,
};