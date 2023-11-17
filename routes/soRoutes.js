import express from 'express';
import controller from '../controllers/so/index.js';

const router = express.Router();

const toolbars = [
	{icon: 'bi bi-house-door-fill', name: 'Trang chủ', link: '/so',},
	{icon: 'bi bi-building-fill', name: 'Danh sách quận huyện', link: '/so/locations'},
	{icon: 'bi bi-badge-ad-fill', name: 'Loại hình quảng cáo', link: '/so/types?category=ads',},
	{icon: 'bi bi-chat-left-dots-fill', name: 'Yêu cầu', link: '/so/requests?category=license',},
	{icon: 'bi bi-journal-bookmark-fill', name: 'Thống kê báo cáo', link: '/so/reports',},
	{icon: 'bi bi-person-badge', name: 'Phân công', link: '/so/assign',}
];


router.get('/', (req, res) => {
	res.render('./so/index', {title: 'Sở - Trang chủ', toolbars: toolbars});
});

router.get('/types', (req, res) => {
	controller.typesController.show(req, res);
});
router.get('/locations', (req, res) => {
	res.render('./so/locations', {title: 'Sở - Quản lý Quận', toolbars: toolbars});
});

router.get('/locations-detail', (req, res) => {
	res.render('./so/location-detail', {title: 'Sở - Quản lý Phường', toolbars: toolbars});
});

router.get('/requests', (req, res) => {
	controller.requestsController.show(req, res);
});

router.get('/request/:id', (req, res) => {
	controller.requestsController.showDetail(req, res);
});
router.get('/assign', (req, res) => {
	controller.assignController.show(req, res);
});

router.get('/report/:id', (req, res) => {
	controller.reportsController.showDetail(req, res);
});

router.get('/reports', (req, res) => {
	controller.reportsController.show(req, res);
})

router.get('/*', (req, res) => {
	console.log(`You are looking for ${req.originalUrl} in views directory ${req.app.get('views')}`);
})

export default router;
