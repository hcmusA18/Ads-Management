import { toolbars } from './utilities.js';
const show = (req, res) => {
	res.render('phuong/licensing-requests', { title: 'Phường - Yêu cầu cấp phép', toolbars: toolbars });
}

const showDetail = (req, res) => {
	res.render('phuong/licensing-requests-detail', { title: 'Phường - Chi tiết yêu cầu cấp phép', toolbars: toolbars });
}

export default {
	show,
	showDetail
}