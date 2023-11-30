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
				const {_id, formID, formName, description} = adsForm.toObject();
				return {
					no: index + 1,
					id: formID,
					name: formName,
					description: description,
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
	console.log('You are getting something');
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

const createForm = async (service, formName, type, desc) => {
	const {message}= await service.create({[`${formName.toLowerCase()}Name`]: type, description: desc});
	return message;
}

controller.add = async (req, res) => {
	try {
		const {category = ''} = req.query;
		const {type, desc} = req.body;
		let message = 'hello';

		switch (category) {
			case 'ads':
				message = await createForm(adsFormService, 'form', type, desc);
				break;
			case 'report':
				message = await createForm(reportTypeService, 'type', type, desc);
				break;
			default:
				req.fresh('error', 'Không tìm thấy loại hình');
				return res.redirect(req.originalUrl);
		}
		console.log(`Message: ${message}`);
		req.flash('success', message);
		return res.redirect(req.originalUrl);
	}
	catch (error) {
		console.log(`Error adding new type: ${error.message}`);
		req.flash('error', error.message);
		return res.redirect(req.originalUrl);
	}
}

const removeForm = async (service, formName, id) => {
	const {message} = await service.remove(id);
	return message;
}

controller.remove = async (req, res) => {
	const newUrl = req.originalUrl.replace(`/${req.params.id}`, '');
	res.method = 'GET';
	try {
		const {category = ''} = req.query;
		const {id} = req.params;
		let message = 'hello';

		switch (category) {
			case 'ads':
				message = await removeForm(adsFormService, 'form', id);
				break;
			case 'report':
				message = await removeForm(reportTypeService, 'type', id);
				break;
			default:
				req.flash('error', 'Không tìm thấy loại hình');
				return res.redirect(303, newUrl);
		}
		console.log(`Message: ${message}`);
		req.flash('success', message);
		return res.redirect(303, newUrl);
	}
	catch (error) {
		console.log(`Error removing type: ${error.message}`);
		req.flash('error', error.message);
		return res.redirect(303, newUrl);
	}
}

export default controller;