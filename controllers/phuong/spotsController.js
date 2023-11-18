import { toolbars } from './utilities.js';

const show = (req, res) => {
	res.render('phuong/spots', { title: 'Phường - Điểm đặt', toolbars: toolbars });
};

const showDetail = (req, res) => {
	res.render('phuong/spot-detail', { title: 'Phường - Chi tiết điểm đặt', toolbars: toolbars });
}

export default {
	show,
	showDetail
}