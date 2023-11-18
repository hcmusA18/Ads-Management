import {toolbars} from './utilities.js';

const show = (req, res) => {
		res.render('quan/license-requests', {title: 'Quận - Yêu cầu cấp phép', toolbars: toolbars});
}

const showDetail = (req, res) => {
	res.render('quan/license-request-detail', {title: 'Quận - Chi tiết yêu cầu cấp phép', toolbars: toolbars});
}

const showCreate = (req, res) => {
	res.render('quan/license-request-create', {title: 'Quận - Tạo yêu cầu cấp phép', toolbars: toolbars});
}
export default {
	show,
	showDetail,
	showCreate
}