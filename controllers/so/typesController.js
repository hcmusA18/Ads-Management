import {toolbars} from './utilities.js';
import * as adsFormService from '../../services/adsFormService.js';
import * as reportTypeService from '../../services/reportTypeService.js';

const controller = {};

controller.show = async (req, res) => {
	const category = req.query.category || '';
	let tableHeads = [];
	let tableData = [];
	let title = '';
	switch (category) {
		case 'ads':
			tableHeads = ['No', 'Mã Loại', 'Tên Loại', 'Mô tả'];
			tableData = await adsFormService.getAllAdsForms();
			tableData = tableData.map((adsForm, index) => {
				const {_id, formID, ...rest} = adsForm.toObject();
				return {
					no: index + 1,
					id: formID,
					...rest,
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
			tableData = await reportTypeService.getAllReportTypes();
			tableData = tableData.map((adsForm, index) => {
				const {_id, typeID, ...rest} = adsForm.toObject();
				return {
					no: index + 1,
					id: typeID,
					...rest,
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

controller.showDetail = async (req, res) => {
	const category = req.query.category || '';
	const id = req.params.id;
	let detail = {};
	let title = '';
	switch (category) {
		case 'ads':
			detail = await adsFormService.getAdsFormByID(id);
			detail = detail.toObject();
			detail = {
				id: detail.formID,
				name: detail.formName,
				description: detail.description,
			}
			title = 'Sở - Chi tiết loại hình quảng cáo';
			break;
		case 'report':
			detail = await reportTypeService.getReportTypeByID(id);
			detail = detail.toObject();
			detail = {
				id: detail.typeID,
				name: detail.typeName,
				description: detail.description,
			}
			title = 'Sở - Hình thức báo cáo';
			break;
		default:
			res.status(404);
			return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}
	return res.render('./so/type-detail', {title, detail, toolbars});
}

export default controller;