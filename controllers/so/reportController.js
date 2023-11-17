import {fakerVI} from '@faker-js/faker';
import {toolbars} from './utilities.js';
const controller = {};

controller.show = (req, res) => {
	const table_header = ['ID Báo cáo', 'ID Điểm/Bảng QC', 'Loại hình', 'Người gửi', 'Email', 'Ngày gửi', 'Trang thái', 'Chi tiết'];
	const table_data = [...Array(55).keys()].map(i => {
		return {
			id: `BC${i + 1}`,
			ads_id: `QC${i + 1}`,
			ads_type: `Loại ${i + 1}`,
			sender: fakerVI.person.fullName(),
			email: fakerVI.internet.email(),
			date: fakerVI.date.anytime({refDate: new Date('2023-01-01')}).toLocaleDateString('vi-VN'),
			status: 'Chờ xử lý'
		}
	});
	const title = 'Sở - Thống kê báo cáo';
	return res.render('./so/reports', {title, table_header, table_data, toolbars});
}

controller.showDetail = (req, res) => {
	const id = req.params.id;
	const detail = {
		id: id,
		ads_id: 'QC1',
		ads_type: 'Loại 1',
		sender: 'Nguyễn Văn A',
		phone: '0123456789',
		email: 'nguyenvana@gmail.com',
		report_type: 'Tố giác sai phạm',
		date: fakerVI.date.anytime({refDate: new Date('2023-01-01')}).toLocaleDateString('vi-VN'),
		state: 'pending',
		content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa quod perspiciatis numquam soluta adipisci aperiam magni? Iure laborum esse aperiam totam, laboriosam voluptatibus neque perferendis quas fugit voluptatem laudantium expedita. Natus veritatis illo harum voluptas deleniti, voluptate possimus hic eveniet itaque sunt dolor adipisci corporis? Quisquam perferendis exercitationem quas. Ab.',
		solution: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate eum, id veniam odio eveniet tempore provident tempora ex beatae laborum quisquam quae culpa minima eligendi, qui quas tenetur repudiandae blanditiis.'
	}
	const title = 'Sở - Chi tiết báo cáo';
	return res.render('./so/report-detail', {title, detail, toolbars});
}

export default controller;