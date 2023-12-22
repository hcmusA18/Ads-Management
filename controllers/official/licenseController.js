import {createToolbar} from './utilities.js';
import { getAllSpots, getSpotByID } from '../../services/spotService.js'
import { create, getByUsername, getByID } from '../../services/licensingRequestService.js'

const getDataByRole = async (role, username) => {
	let data = await getByUsername(username);
	console.log(JSON.stringify(data, null, 2));
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

	// const data = {
	// 	spotId: 'DD' + String(Math.floor(Math.random() * 100000)).padStart(5, '0'),
	// 	spotAddr: '227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM',
	// 	company: 'Công ty cổ phần CivicAds',
	// 	phone: '0123456789',
	// 	email: 'civicads@gmail.com',
	// 	compAddr: '229 Nguyễn Văn Trỗi, Phường 4, Quận 1, TP.HCM',
	// 	startTime: '01/01/2021',
	// 	endTime: '01/01/2023',
	// 	content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam eaque ipsa ut, possimus repellat, sint iure dolor libero, voluptatibus non incidunt atque. Quae neque nostrum fugit ad quia incidunt doloribus!',
	// 	other: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa quod perspiciatis numquam soluta adipisci aperiam magni? Iure laborum esse aperiam totam, laboriosam voluptatibus neque perferendis quas fugit voluptatem laudantium expedita. Natus veritatis illo harum voluptas deleniti, voluptate possimus hic eveniet itaque sunt dolor adipisci corporis? Quisquam perferendis exercitationem quas. Ab.',
	// 	state: 'Chờ xử lý',
	// 	imgUrls: [
	// 		'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%201',
	// 		'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%202',
	// 		'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%203',
	// 		'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%204',
	// 		'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%205',
	// 		'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%206'
	// 	],
	// }

	let data = await getByID(req.params.id);
	let spotDetail = await getSpotByID(data.spotID);
	console.log(JSON.stringify(spotDetail, null, 2));
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

	//get spots
	let spots = await getAllSpots();
	spots = spots.map(spot => {
		const {spotID, spotName, spotType, address, districtID, wardID, districtName, wardName, planned} = spot;
		return {
			id: spotID,
			name: spotName,
			type: spotType,
			address: `${address}, Phường ${wardName}, Quận ${districtName}`,
			districtId: districtID,
			wardId: wardID,
			districtName: districtName,
			wardName: wardName,
			planned: planned,
		}
	});
	// console.log(JSON.stringify(spots, null, 2));

	res.render('license-create', {url: req.originalUrl, title, spots, toolbars: createToolbar(role)});
}

const add = async (req, res) => {
	try {
		const data = req.body;
		let { message } = await create(data);
		console.log(`Message: ${message}`);
		req.flash('success', message);
		return res.redirect(req.originalUrl);
	} catch (error) {
		console.log(`Error adding new request: ${error.message}`);
		req.flash('error', error.message);
		return res.redirect(req.originalUrl);
	}
}

export default {
	add,
	show,
	showDetail,
	showCreate
};