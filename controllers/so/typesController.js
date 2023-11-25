import {toolbars} from './utilities.js';

const controller = {};

controller.show = (req, res) => {
	const category = req.query.category || '';
	let tableHeads = [];
	let tableData = [];
	let title = '';
	switch (category) {
		case 'ads':
			tableHeads = ['No', 'Mã Loại', 'Tên Loại', 'Mô tả'];
			tableData = [...Array(55).keys()].map(i => {
				return {
					no: i + 1,
					id: `LHQC${i + 1}`,
					name: `Loại ${i + 1}`,
					description: `Loại ${i + 1} là loại quảng cáo để demo`,
					actions: {
						edit: true,
						remove: true,
						info: true
					}
				}
			});
			title = 'Sở - Loại hình quảng cáo';
			break;
		case 'report':
			tableHeads = ['No', 'Mã Hinh Thức', 'Tên Hình Thức', 'Mô tả'];
			tableData = [...Array(55).keys()].map(i => {
				return {
					no: i + 1,
					id: `HTBC${i + 1}`,
					name: `Hình thức ${i + 1}`,
					description: `Hình thức ${i + 1} là hình thức báo cáo để demo`,
					actions: {
						edit: true,
						remove: true,
						info: true
					}
				}
			});
			title = 'Sở - Hình thức báo cáo';
			break;
		default:
			res.status(404);
			return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}

	return res.render('./so/types', {title, category, tableHeads, tableData, toolbars});
}

export default controller;