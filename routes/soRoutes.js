import express from 'express';
import controller from '../controllers/so/index.js';

const router = express.Router();

const toolbars = [
	{icon: 'bi bi-house-door-fill', name: 'Trang chủ', link: '/so',},
	{icon: 'bi bi-building-fill', name: 'Danh sách quận huyện', link: '/so/locations'},
	{icon: 'bi bi-geo-fill', name: 'Điểm đặt / bảng quảng cáo', link: '/so/ads?category=spot'},
	{icon: 'bi bi-badge-ad-fill', name: 'Loại hình quảng cáo', link: '/so/types?category=ads'},
	{icon: 'bi bi-chat-left-dots-fill', name: 'Yêu cầu', link: '/so/requests?category=license'},
	{icon: 'bi bi-journal-bookmark-fill', name: 'Thống kê báo cáo', link: '/so/reports',},
	{icon: 'bi bi-person-badge', name: 'Phân công', link: '/so/assign'}];


router.get('/', (req, res) => {
	res.render('./so/index', {title: 'Sở - Trang chủ', toolbars: toolbars});
});

router.get('/types', async (req, res) => {
	await controller.typesController.show(req, res);
});
router.get('/types/:id', (req, res) => {
	controller.typesController.showDetail(req, res);
});
router.post('/types', async (req, res) => {
	await controller.typesController.add(req, res);
});
router.get('/locations', (req, res) => {
	controller.locationsController.findAllDistricts(req, res);
});

router.get('/locations-detail', (req, res) => {
	res.render('./so/location-detail', {title: 'Sở - Quản lý Phường', toolbars: toolbars});
});

router.get('/requests', (req, res) => {
	controller.requestsController.show(req, res);
});

router.get('/requests/:id', (req, res) => {
	controller.requestsController.showDetail(req, res);
});

router.get('/assign', (req, res) => {
	controller.assignController.show(req, res);
});

router.delete('/assign/:username', (req, res) => {
	controller.assignController.deleteAccount(req, res);
})

router.get('/getWards/:id', async (req, res) => {
	await controller.assignController.getWards(req, res);
})


router.get('/reports', (req, res) => {
	controller.reportsController.show(req, res);
})
router.get('/reports/:id', (req, res) => {
	controller.reportsController.showDetail(req, res);
});
router.get('/ads', (req, res) => controller.adsController.show(req, res));
router.get('/ads/new', (req, res) => controller.adsController.showAdd(req, res));
router.get('/ads/:id', (req, res) => controller.adsController.showDetail(req, res));
router.get('/ads/:id/modify', (req, res) => controller.adsController.showModify(req, res));
router.get('/*', (req, res) => {
	console.log(`You are looking for ${req.originalUrl} in views directory ${req.app.get('views')}`);
})

export default router;
