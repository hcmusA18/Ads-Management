import {createToolbar} from './utilities.js';

const show = (req, res) => {
	const role = String(req.originalUrl.split('/')[1]);
	let title = ' - Yêu cầu cấp phép quảng cáo';
	const roleData = {
		quan: {
			tableHeads: ['ID Yêu cầu', 'ID Điểm đặt', 'Phường', 'Công ty yêu cầu', 'Thời gian quảng cáo', 'Trạng thái'],
			tableData: [...Array(55).keys()].map(i => {
				return {
					id: 'CP' + String(i + 1).padStart(5, '0'),
					spotId: 'DD' + String(i + 1).padStart(5, '0'),
					ward: `Phường ${(i + 1) % 13}`,
					company: 'Công ty cổ phần CivicAds',
					time: '01/01/2021 - 01/01/2022',
					state: Math.random() > 0.667 ? 'Chưa xử lý' : (Math.random() > 0.333 ? 'Đang xử lý' : 'Đã xử lý'),
					actions: {
						edit: false,
						remove: false,
						info: true
					}
				}
			}),
			checkboxData: [...Array(13).keys()].map(i => `Phường ${i + 1}`),
			checkboxHeader: 'QUẬN 2',
		},
		phuong: {
			tableHeads: ['ID Yêu cầu', 'ID Điểm đặt', 'Công ty yêu cầu', 'Thời gian quảng cáo', 'Trạng thái'],
			tableData: [...Array(55).keys()].map(i => {
				return {
					id: 'CP' + String(i + 1).padStart(5, '0'),
					spotId: 'DD' + String(i + 1).padStart(5, '0'),
					company: 'Công ty cổ phần CivicAds',
					time: '01/01/2021 - 01/01/2022',
					state: Math.random() > 0.667 ? 'Chưa xử lý' : (Math.random() > 0.333 ? 'Đang xử lý' : 'Đã xử lý'),
					actions: {
						edit: false,
						remove: false,
						info: true
					}
				}
			})
		},
	}

	const roleInfo = roleData[role];
	if (!roleInfo) {
		res.status(404);
		return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}
	title = (role === 'quan' ? 'Quận' : 'Phường') + title;
	res.render('license', {url: req.originalUrl, title: title, ...roleInfo, toolbars: createToolbar(role)});
}

const showDetailOrCreate = (req, res, detail = false) => {
	const role = String(req.originalUrl.split('/')[1]);
	let title = ` - ${detail ? 'Chi tiết' : 'Tạo'} yêu cầu cấp phép quảng cáo`;
	title = (role === 'quan' ? 'Quận' : 'Phường') + title;

	const data = {
		spotId: 'DD' + String(Math.floor(Math.random() * 100000)).padStart(5, '0'),
		spotAddr: '227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM',
		company: 'Công ty cổ phần CivicAds',
		phone: '0123456789',
		email: 'civicads@gmail.com',
		compAddr: '229 Nguyễn Văn Trỗi, Phường 4, Quận 1, TP.HCM',
		startTime: '01/01/2021',
		endTime: '01/01/2023',
		content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam eaque ipsa ut, possimus repellat, sint iure dolor libero, voluptatibus non incidunt atque. Quae neque nostrum fugit ad quia incidunt doloribus!',
		other: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa quod perspiciatis numquam soluta adipisci aperiam magni? Iure laborum esse aperiam totam, laboriosam voluptatibus neque perferendis quas fugit voluptatem laudantium expedita. Natus veritatis illo harum voluptas deleniti, voluptate possimus hic eveniet itaque sunt dolor adipisci corporis? Quisquam perferendis exercitationem quas. Ab.',
		state: 'Chờ xử lý',
		imgUrls: [
			'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%201',
			'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%202',
			'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%203',
			'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%204',
			'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%205',
			'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%206'
		],
	}
	res.render('license-detail-create', {
		detail: detail,
		title,
		toolbars: createToolbar(role),
		...data,
		url: req.originalUrl
	});
}

export default {
	show,
	showDetailOrCreate,
};