import { toolbars } from './utilities.js';

const show = (req, res) => {
	res.render('quan/spots', { title: 'Quận - Điểm đặt', toolbars: toolbars });
};

const showDetail = (req, res) => {
	res.render('quan/spot-detail', { title: 'Quận - Chi tiết điểm đặt', toolbars: toolbars });
}

export default {
	show,
	showDetail
}