import express from 'express';
import controller from '../controllers/quan/index.js';

const router = express.Router();

const toolbars = [
	{icon: 'bi bi-house-door-fill', name: 'Trang chủ', link: '/quan',},
	{icon: 'bi bi-geo-fill', name: 'Điểm đặt quảng cáo', link: '/quan/ads?category=spot'},
	{icon: 'bi bi-badge-ad-fill', name: 'Bảng quảng cáo', link: '/quan/ads?category=board'},
	{icon: 'bi bi-file-earmark-text-fill', name: 'Báo cáo vi phạm', link: '/quan/reports'},
	{icon: 'bi bi-chat-left-dots-fill', name: 'Yêu cầu cấp phép', link: '/quan/license',},
]

router.get('/', (req, res) => {
	res.render('quan/index', {title: 'Quận - Trang chủ', toolbars: toolbars});
});

router.get('/reports', (req, res) => {
	controller.reportsController.show(req, res);
});

router.get('/reports/:id', (req, res) => {
	controller.reportsController.showDetail(req, res);
})

router.get('/ads', (req, res) => controller.adsController.show(req, res));
router.get('/ads/:id', (req, res) => controller.adsController.showDetail(req, res));
router.get('/ads/:id/modify', (req, res) => controller.adsController.showModify(req, res));
router.get('/license', (req, res) => {
	controller.licenseController.show(req, res);
})
router.get('/license/create', (req, res) => {
	controller.licenseController.showDetailOrCreate(req, res, false);
})
router.get('/license/:id', (req, res) => {
	controller.licenseController.showDetailOrCreate(req, res, true);
})

export default router;
