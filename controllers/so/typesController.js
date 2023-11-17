import {toolbars} from './utilities.js';

const controller = {};

controller.show = (req, res) => {
	const category = req.query.category || '';
	let table_header = [];
	let table_data = [];
	let title = '';
	if (category === 'ads') {
		table_header = ['No', 'Mã Loại', 'Tên Loại', 'Mô tả'];
		table_data = [...Array(55).keys()].map(i => {
			return {
				no: i + 1,
				id: `LHQC${i + 1}`,
				name: `Loại ${i + 1}`,
				description: `Loại ${i + 1} là loại quảng cáo để demo`,
			}
		});
		title = 'Sở - Loại hình quảng cáo';
	} else if (category === 'report') {
		table_header = ['No', 'Mã Hinh Thức', 'Tên Hình Thức', 'Mô tả'];
		table_data = [...Array(55).keys()].map(i => {
			return {
				no: i + 1,
				id: `HTBC${i + 1}`,
				name: `Hình thức ${i + 1}`,
				description: `Hình thức ${i + 1} là hình thức báo cáo để demo`,

			}
		});
		title = 'Sở - Hình thức báo cáo';
	} else {
		res.status(404);
		return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}
	return res.render('./so/types', {title, category, table_header, table_data, toolbars});
}

export default controller;