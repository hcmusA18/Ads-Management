import {toolbars} from './utilities.js';

const show = (req, res) => {
	res.render('quan/boards', { title: 'Quận - Báo cáo', toolbars: toolbars });
}

const showDetail = (req, res) => {
	res.render('quan/board-detail', { title: 'Quận - Chi tiết báo cáo', toolbars: toolbars });
}

export default {
	show,
	showDetail
}