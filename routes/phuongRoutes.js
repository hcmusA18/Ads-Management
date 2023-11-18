import express from 'express';
import controller from '../controllers/phuong/index.js';

const router = express.Router();

const toolbars=[ { icon: 'bi bi-house-door-fill' , name: 'Trang chủ' , link:'/phuong', }, 
{ icon: 'bi bi-geo-fill', name: 'Điểm đặt / bảng quảng cáo' , link: '/phuong/spots' }, 
{ icon: 'bi bi-file-earmark-text-fill' ,name: 'Xử lý báo cáo' , link: '/phuong/reports' , }, 
{ icon: 'bi bi-chat-left-dots-fill' , name: 'Yêu cầu cấp phép' , link: '/phuong/yeucau' , }, ]

router.get('/', (req, res) => {
  res.render('phuong/index', { title: 'Phường - Trang chủ', toolbars: toolbars });
});

router.get('/spots', (req, res) => controller.spotsController.show(req, res));

router.get('/spot/:id', (req, res) => controller.spotsController.showDetail(req, res));

router.get('/spot/:id/modify', (req, res) => controller.spotsController.showModify(req, res));

router.get('/boards', (req, res) => controller.boardController.show(req, res));

router.get('/board/:id', (req, res) => controller.boardController.showDetail(req, res));

router.get('/reports', (req, res) => controller.reportsController.show(req, res));

router.get('/report/:id', (req, res) => controller.reportsController.showDetail(req, res));

router.get('/yeucau', (req, res) => {
  res.render('phuong/YeuCauCapPhep/YeuCauCP', { title: 'Phường - Yêu cầu', toolbars: toolbars });
})

router.get('/yeucau/cp', (req, res) => {
  res.render('quan/YeuCauCP', { title: 'Phường - Yêu cầu cấp phép', toolbars: toolbars });
})

router.get('/yeucau/cp/:id', (req, res) => {
  res.render('quan/ChitietYeuCauCP', { title: 'Phường - Chi tiết yêu cầu cấp phép', toolbars: toolbars });
})

router.get('/yeucau/cs/diemdat/:id', (req, res) => {
  res.render('quan/YeuCauCS-diem', { title: 'Phường - Yêu cầu chỉnh sửa điểm đặt', toolbars: toolbars });
})

router.get('/yeucau/cs/bangquangcao/:id', (req, res) => {
  res.render('quan/YeuCauCS-bang', { title: 'Phường - Yêu cầu chỉnh sửa bảng quảng cáo', toolbars: toolbars });
})

export default router;
