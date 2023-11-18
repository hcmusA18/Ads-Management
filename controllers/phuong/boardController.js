import {toolbars} from './utilities.js';

const show = (req, res) => {
	res.render('phuong/boards', { title: 'Phường - Bảng quảng cáo ', toolbars: toolbars });
}

const showDetail = (req, res) => {
	res.render('phuong/board-detail', { title: 'Phường - Chi tiết bảng quảng cáo', toolbars: toolbars });
}

const showModify = (req, res) => {
	res.render('phuong/board-modify', { title: 'Phường - Yêu cầu chỉnh sửa bảng quảng cáo', toolbars: toolbars });
}

export default {
	show,
	showDetail,
	showModify
}