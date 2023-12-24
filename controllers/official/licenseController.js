import {createToolbar} from './utilities.js';
import { getSpotsByDistrictID, getSpotsByWardID, getSpotByID } from '../../services/spotService.js'
import { create, getByUsername, getByID } from '../../services/licensingRequestService.js'
import { getRoleByUsername } from '../../services/officerService.js';
import { getAllBoardTypes } from '../../services/boardTypeService.js';
import * as IDGenerator from '../../services/IDGenerator.js';

const getDataByRole = async (role, username) => {
	let data = await getByUsername(username);
	// console.log(JSON.stringify(data, null, 2));
	data = data.map((item) => {
		const {requestID, spotID, wardName, companyName, startDate, endDate, status} = item.toObject();
		const commonData = {
      id: requestID,
      spotID,
      company: companyName,
      time: `${Date(startDate).slice(4, 15)} - ${Date(endDate).slice(4, 15)}`,
      state: status === 0 ? 'Chờ xử lý' : status === 1 ? 'Đã xử lý' : 'Đã hủy',
      actions: { edit: false, info: true, remove: false }
    };
		return role === 'quan' ? { ...commonData, ward: wardName } : { ...commonData }
	});

	return {tableData: data, checkboxHeader: role === 'quan'? data.length ? data[0].ward : null : null};
}

const getTableHeadsByRole = (role) => role === 'quan' ?
	['ID Yêu cầu', 'ID Điểm đặt', 'Phường', 'Công ty yêu cầu', 'Thời gian quảng cáo', 'Trạng thái'] :
	['ID Yêu cầu', 'ID Điểm đặt', 'Công ty yêu cầu', 'Thời gian quảng cáo', 'Trạng thái'];

const show = async (req, res) => {
	const role = String(req.originalUrl.split('/')[1]);
	let title = role === 'quan' ? 'Quận - Quản lý yêu cầu cấp phép' : 'Phường - Quản lý yêu cầu cấp phép';
	const roleInfo = {
		tableHeads: getTableHeadsByRole(role),
		...await getDataByRole(role, req.user.username),
		checkboxData: [...Array(13).keys()].map(i => `Phường ${i + 1}`)
	}
	if (!roleInfo) {
		res.status(404);
		return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}
	res.render('license', {url: req.originalUrl, title: title, ...roleInfo, toolbars: createToolbar(role)});
}

const showDetail = async (req, res, detail = false) => {
	const role = String(req.originalUrl.split('/')[1]);
	let title = ` - ${detail ? 'Chi tiết' : 'Tạo'} yêu cầu cấp phép quảng cáo`;
	title = (role === 'quan' ? 'Quận' : 'Phường') + title;

	let data = await getByID(req.params.id);
	let spotDetail = await getSpotByID(data.spotID);
	// console.log(JSON.stringify(spotDetail, null, 2));
	data = {
		spotId: data.spotID,
		spotAddr: `${spotDetail[0].address}, Phường ${spotDetail[0].wardName}, Quận ${spotDetail[0].districtName}`,
		company: data.companyName,
		phone: data.companyPhone,
		email: data.companyEmail,
		compAddr: data.companyAddress,
		startTime: Date(data.startDate).slice(4, 15),
		endTime: Date(data.endDate).slice(4, 15),
		content: data.content,
		other: data.other,
		state: data.status === 0 ? 'Chờ xử lý' : data.status === 1 ? 'Đã xử lý' : 'Đã hủy',
		imgUrls: data.adsImages,
	}

	res.render('license-detail-create', {
		detail: detail,
		title,
		toolbars: createToolbar(role),
		...data,
		url: req.originalUrl
	});
}

const showCreate = async (req, res) => {
	const role = String(req.originalUrl.split('/')[1]);
	let title = ' - Tạo yêu cầu cấp phép quảng cáo';
	title = (role === 'quan' ? 'Quận' : 'Phường') + title;

	const officerRole = await getRoleByUsername(req.user.username);
	// console.log(officerRole);
	let spots = {};
	if(role === 'quan'){
		spots = await getSpotsByDistrictID(officerRole);
	} else {
		spots = await getSpotsByWardID(officerRole);
	}

	// console.log(spots);

	spots = spots.map(spot => {
		const {spotID, spotName, spotType, address, districtID, wardID, districtName, wardName, planned} = spot;
		return {
			id: spotID,
			name: spotName,
			address: `${address}, Phường ${wardName}, Quận ${districtName}`,
		}
	});
	
	let boardtypes = await getAllBoardTypes();

	res.render('license-create', {url: req.originalUrl, title, boardtypes, spots, toolbars: createToolbar(role)});
}

const add = async (req, res) => {
	try {
		const data = req.body;
		data.requestID = await IDGenerator.getNewID('LicensingRequest');
		data.status = 0;
		await create(data);
		res.status(200).json({ message: 'Bảng quảng cáo đã được thêm thành công' })
	} catch (error) {
		console.error(error)
    	res.status(500).json({ message: 'Lỗi server' })
	}
}

export default {
	add,
	show,
	showDetail,
	showCreate
};