import express from 'express';
import controller from '../controllers/quan/index.js';

const router = express.Router();

const toolbars = [
	{icon: 'bi bi-house-door-fill', name: 'Trang chủ', link: '/quan',},
	{icon: 'bi bi-geo-fill', name: 'Điểm đặt quảng cáo', link: '/quan/spots'},
	{icon: 'bi bi-badge-ad-fill', name: 'Bảng quảng cáo', link: '/quan/boards'},
	{icon: 'bi bi-file-earmark-text-fill', name: 'Báo cáo vi phạm', link: '/quan/reports'},
	{icon: 'bi bi-chat-left-dots-fill', name: 'Yêu cầu cấp phép', link: '/quan/licenses',},
]

router.get('/', (req, res) => {
	res.render('quan/index', {title: 'Quận - Trang chủ', toolbars: toolbars});
});

router.get('/reports', (req, res) => {
	controller.reportsController.show(req, res);
});

router.get('/report/:id', (req, res) => {
	controller.reportsController.showDetail(req, res);
})

router.get('/spots', (req, res) => {
	controller.spotsController.show(req, res);
})
router.get('/spot/:id', (req, res) => {
	controller.spotsController.showDetail(req, res);
})

router.get('/spot/:id/modify', (req, res) => {
	controller.spotsController.showModify(req, res);
})

router.get('/boards', (req, res) => {
	controller.boardController.show(req, res);
})

router.get('/board/:id', (req, res) => {
	controller.boardController.showDetail(req, res);
})

router.get('/board/:id/modify', (req, res) => {
	controller.boardController.showModify(req, res);
})

router.get('/licenses', (req, res) => {
	controller.licenseRequestsController.show(req, res);
})
router.get('/license/create', (req, res) => {
	controller.licenseRequestsController.showCreate(req, res);
})
router.get('/license/:id', (req, res) => {
	controller.licenseRequestsController.showDetail(req, res);
})

export default router;
