import { toolbars } from './utilities.js';

const show = (req, res) => {
	res.render('so/spots', { title: 'Sở - Điểm đặt', toolbars: toolbars });
};

const showDetail = (req, res) => {
	res.render('so/spot-detail', { title: 'Sở - Chi tiết điểm đặt', toolbars: toolbars });
}

const showAdd = (req, res) => {
    res.render('so/spot-add', { title: 'Sở - Thêm điểm đặt', toolbars: toolbars });
}

export default {
	show,
	showDetail,
    showAdd
}