import {createToolbar} from './utilities.js';
import {getRoleByUsername} from '../../services/officerService.js';
import {getReportByOfficerRole} from '../../services/reportService.js';

const convertDate = (date) => {
	const dateString = '2023-02-07T17:00:00.000Z';
	const dateObject = new Date(dateString);

	const day = dateObject.getDate().toString().padStart(2, '0');
	const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
	const year = dateObject.getFullYear();

	return `${day}/${month}/${year}`;
}

const show = async (req, res) => {
	const role = String(req.originalUrl.split('/')[1]);
	let title = role === 'quan' ? 'Quận - Quản lý báo cáo vi phạm' : 'Phường - Quản lý báo cáo vi phạm';
	// console.log(req.user.username);
	const officerRole = await getRoleByUsername(req.user.username);
	// console.log(officerRole);
	const data = await getReportByOfficerRole(officerRole);
	// // console.log(data);
	// convertDate('2023-02-07T17:00:00.000Z');
	const roleData = {
		quan: {
			tableHeads: ['ID Báo Cáo', 'ID DD / QC', 'Loại hình báo cáo', 'Phường'
				, 'Họ tên người gửi', 'Email', 'Thời điểm gửi', 'Trạng thái'],
			tableData: [...Array(55).keys()].map(i => {
				return {
					id: 'BC' + String(i + 1).padStart(5, '0'),
					objectID: 'DD' + String(i + 1).padStart(5, '0'),
					reportType: 'Tố giác sai phạm',
					ward: `Phường ${(i + 1) % 13}`,
					reporterName: 'Nguyễn Công Khanh',
					reporterEmail: 'abcxyz@gmail.com',
					sendTime: '01/01/2021',
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
			tableHeads: ['ID Báo Cáo', 'ID DD / QC', 'Loại hình báo cáo',
				'Họ tên người gửi', 'Email', 'Thời điểm gửi', 'Trạng thái'],
			tableData: data.map((item) => {
				return {
					id: item.reportID,
					objectID: item.objectID,
					reportType: item.reportType,
					reporterName: item.reporterName,
					reporterEmail: item.reporterEmail,
					sendTime: convertDate(item.sendTime),
					state: item.status === 1 ? "Đã xử lí" : "Đang xử lí",
					actions: {
						edit: false,
						remove: false,
						info: true
					}
				}
			}),
		},
	}

	const roleInfo = roleData[role];
	if (!roleInfo) {
		res.status(404);
		return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}
	res.render('reports', {url: req.originalUrl, title: title, ...roleInfo, toolbars: createToolbar(role)});
}

const showDetail = (req, res) => {
	const role = String(req.originalUrl.split('/')[1]);
	let title = ' - Chi tiết báo cáo';
	title = (role === 'quan' ? 'Quận' : 'Phường') + title;

	const data = {
		id: 'BC' + String(Math.floor(Math.random() * 100000)).padStart(5, '0'),
		phone: '091388294',
		state: 1,
		objectID: 'QC00004',
		reportType: 'Tố giác vi phạm',
		sendTime: '01-01-2024',
		name: 'Nguyễn Công Khanh',
		email: 'abcxyz@gmail.com',
		content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam eaque ipsa ut, possimus repellat, sint iure dolor libero, voluptatibus non incidunt atque. Quae neque nostrum fugit ad quia incidunt doloribus!',
		solution: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa quod perspiciatis numquam soluta adipisci aperiam magni? Iure laborum esse aperiam totam, laboriosam voluptatibus neque perferendis quas fugit voluptatem laudantium expedita. Natus veritatis illo harum voluptas deleniti, voluptate possimus hic eveniet itaque sunt dolor adipisci corporis? Quisquam perferendis exercitationem quas. Ab.',
		imgUrls: [
			'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%201',
			'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%202'
		],
	}
	res.render('report-detail', {role, title, toolbars: createToolbar(role), ...data});
}

export default {
	show,
	showDetail,
};