import express from 'express';
import controller from '../controllers/quan/index.js';

const router = express.Router();

const toolbars = [
	{icon: 'bi bi-house-door-fill', name: 'Trang chủ', link: '/quan',},
	{icon: 'bi bi-geo-fill', name: 'Điểm đặt quảng cáo', link: '/quan/spots'},
	{icon: 'bi bi-badge-ad-fill', name: 'Bảng quảng cáo', link: '/quan/boards'},
	{icon: 'bi bi-file-earmark-text-fill', name: 'Báo cáo vi phạm', link: '/quan/reports'},
	{icon: 'bi bi-chat-left-dots-fill', name: 'Yêu cầu cấp phép', link: '/quan/yeucau/cp',},
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

router.get('/boards', (req, res) => {
	controller.boardController.show(req, res);
})

router.get('/board/:id', (req, res) => {
	controller.boardController.showDetail(req, res);
})


router.get('/yeucau/cp', (req, res) => {
	res.render('quan/YeuCauCP', {title: 'Quận - Yêu cầu cấp phép', toolbars: toolbars});
})

router.get('/yeucau/cp/:id', (req, res) => {
	res.render('quan/ChitietYeuCauCP', {title: 'Quận - Chi tiết yêu cầu cấp phép', toolbars: toolbars});
})

router.get('/yeucau/cp-new/', (req, res) => {
	res.render('quan/TaoYeuCauCP', {title: 'Quận - Tạo yêu cầu cấp phép', toolbars: toolbars});
})


router.get('/yeucau/cs/diemdat/:id', (req, res) => {
	res.render('quan/YeuCauCS-diem', {title: 'Quận - Yêu cầu chỉnh sửa điểm đặt', toolbars: toolbars});
})

router.get('/yeucau/cs/bangquangcao/:id', (req, res) => {
	res.render('quan/YeuCauCS-bang', {title: 'Quận - Yêu cầu chỉnh sửa bảng quảng cáo', toolbars: toolbars});
})


export default router;
