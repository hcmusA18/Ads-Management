import {toolbars} from './utilities.js';

const show = (req, res) => {
	res.render('so/boards', { title: 'Sở - Bảng quảng cáo', toolbars: toolbars });
}

const showDetail = (req, res) => {
	res.render('so/board-detail', { title: 'Sở - Chi tiết bảng quảng cáo', toolbars: toolbars });
}

const showAdd = (req, res) => {
    res.render('so/board-add', { title: 'Sở - Thêm bảng quảng cáo', toolbars: toolbars });
}

const showModify = (req, res) => {
    res.render('so/board-modify', { title: 'Sở - Chỉnh sửa bảng quảng cáo', toolbars: toolbars });
}

export default {
	show,
	showDetail,
    showAdd,
	showModify
}