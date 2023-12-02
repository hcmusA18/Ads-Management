import {toolbars} from './utilities.js';
import * as adsFormService from '../../services/adsFormService.js';
import * as reportTypeService from '../../services/reportTypeService.js';

const controller = {};
const createForm = async (service, formName, type, desc) => {
	const {message}= await service.create({[`${formName.toLowerCase()}Name`]: type, description: desc});
	return message;
}
const removeForm = async (service, formName, id) => {
	const {message} = await service.remove(id);
	return message;
}

controller.show = async (req, res) => {
	const category = req.query.category || '';
	let tableHeads = [];
	let tableData = [];
	let title = '';
	if (category === 'ads') {
		tableHeads = ['No', 'Mã Loại', 'Tên Loại', 'Mô tả'];
		tableData = await adsFormService.getAllAdsForms();
		tableData = tableData.map((adsForm, index) => {
			const {formID, formName, description} = adsForm.toObject();
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
	} else if (category === 'report') {
		tableHeads = ['No', 'Mã Hinh Thức', 'Tên Hình Thức', 'Mô tả'];
		tableData = await reportTypeService.getAllReportTypes();
		tableData = tableData.map((adsForm, index) => {
			const {typeID, typeName, description } = adsForm.toObject();
			return {
				no: index + 1,
				id: typeID,
				name: typeName,
				description: description,
				actions: {
					edit: true,
					remove: true,
					info: true
				}
			}
		});
		title = 'Sở - Hình thức báo cáo';
	} else {
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
				req.flash('error', 'Không tìm thấy loại hình');
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
				res.send({message: 'Không tìm thấy loại hình'});
		}
		console.log(`Message: ${message}`);
		req.flash('success', message);
		res.send({message});
	}
	catch (error) {
		console.log(`Error removing type: ${error.message}`);
		req.flash('error', error.message);
		res.send({message: error.message});
	}
}

controller.modify = async (req, res) => {
	const newUrl = req.originalUrl.replace(`/${req.params.id}`, '');
	try {
		const {category = ''} = req.query;
		const {id} = req.params;
		const {type, desc} = req.body;
		let message = 'hello';

		console.log('You are updating something');
		switch (category) {
			case 'ads':
				message = await adsFormService.updateAdsFormByID(id, {formName: type, description: desc});
				break;
			case 'report':
				message = await reportTypeService.updateReportTypeByID(id, {typeName: type, description: desc});
				break;
			default:
				req.flash('error', 'Không tìm thấy loại hình');
				return res.redirect(newUrl);
		}
		console.log(`Message: ${message}`);
		req.flash('success', message);
		return res.redirect(newUrl);
	}
	catch (error) {
		console.log(`Error editing type: ${error.message}`);
		req.flash('error', error.message);
		return res.redirect(newUrl);
	}
}
export default controller;