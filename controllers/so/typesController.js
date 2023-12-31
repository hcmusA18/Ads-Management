import {toolbars} from './utilities.js';
import * as adsFormService from '../../services/adsFormService.js';
import * as reportTypeService from '../../services/reportTypeService.js';

const mapData = (data, idKey, nameKey, descKey) => {
	return data.map((item, index) => {
		const { [idKey]: id, [nameKey]: name, [descKey]: description } = item.toObject();
		return {
			no: index + 1,
			id,
			name,
			description,
			actions: {edit: true, remove: true, info: true}
		};
	});
};

const handleCategory = async (category, service, idKey, nameKey, descKey) => {
	const tableHeads = {
		ads: ['No', 'Mã Loại', 'Tên Loại', 'Mô tả'],
		report: ['No', 'Mã Hinh Thức', 'Tên Hình Thức', 'Mô tả']
	};
	let tableData = await service();
	tableData = mapData(tableData, idKey, nameKey, descKey);

	return {tableHeads: tableHeads[category], tableData};
}

const createForm = async (service, formName, type, desc) => {
	const {message}= await service.create({[`${formName.toLowerCase()}Name`]: type, description: desc});
	return message;
}
const removeForm = async (service, formName, id) => {
	const {message} = await service.remove(id);
	return message;
}

const show = async (req, res) => {
	const category = req.query.category || '';
	let tableHeads = [];
	let tableData = [];
	let title = '';

	try {
		if (category === 'ads' || category === 'report') {
			const {tableHeads: heads, tableData: data} =
				await handleCategory(category,
					category === 'ads' ? adsFormService.getAllAdsForms : reportTypeService.getAllReportTypes,
					category === 'ads' ? 'formID' : 'typeID',
					category === 'ads' ? 'formName' : 'typeName',
					'description');
			tableHeads = heads;
			tableData = data;
			title = category === 'ads' ? 'Sở - Loại hình quảng cáo' : 'Sở - Hình thức báo cáo';
		} else {
			res.status(404);
			return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
		}

		// console.log('You are getting something');
		return res.render('./so/types', {title, category, tableHeads, tableData, toolbars});
	} catch (error) {
		console.error(`Error getting ${category} data: ${error.message}`);
		return res.render('error', {error: {status: 404, message: 'Lỗi hệ thống'}});
	}
}

const showDetail = async (req, res) => {
	const category = req.query.category || '';
	const id = req.params.id;
	let detail = {};
	let title = '';
	try {
		const service = category === 'ads' ? adsFormService.getAdsFormByID : reportTypeService.getReportTypeByID;
		detail = await service(id);
		detail = {
			id: detail[category === 'ads' ? 'formID' : 'typeID'],
			name: detail[category === 'ads' ? 'formName' : 'typeName'],
			description: detail.description
		}
		title = category === 'ads' ? 'Sở - Loại hình quảng cáo' : 'Sở - Hình thức báo cáo';
		return res.render('./so/type-detail', { title, detail, toolbars });
	} catch (error) {
		console.error(`Error in showDetail: ${error.message}`);
		res.status(404);
		return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}
}

const add = async (req, res) => {
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

const remove = async (req, res) => {
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

const modify = async (req, res) => {
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
export default {
	show,
	showDetail,
	add,
	remove,
	modify
}