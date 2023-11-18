import { toolbars } from './utilities.js';
const show = (req, res) => {
	res.render('phuong/reports', { title: 'Phường - Báo cáo', toolbars: toolbars });
}

const showDetail = (req, res) => {
	res.render('phuong/report-detail', { title: 'Phường - Chi tiết báo cáo', toolbars: toolbars });
}

export default {
	show,
	showDetail
}