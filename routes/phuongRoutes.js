import express from 'express';
import controller from '../controllers/phuong/index.js';

const router = express.Router();

const toolbars=[ { icon: 'bi bi-house-door-fill' , name: 'Trang chủ' , link:'/phuong', }, 
{ icon: 'bi bi-geo-fill', name: 'Điểm đặt quảng cáo' , link: '/phuong/spots' }, 
{ icon: 'bi bi-badge-ad-fill', name: 'Bảng quảng cáo', link: '/phuong/boards'},
{ icon: 'bi bi-file-earmark-text-fill' ,name: 'Xử lý báo cáo' , link: '/phuong/reports' , }, 
{ icon: 'bi bi-chat-left-dots-fill' , name: 'Yêu cầu cấp phép' , link: '/phuong/licensing-requests', }, ]

router.get('/', (req, res) => {
  res.render('phuong/index', { title: 'Phường - Trang chủ', toolbars: toolbars });
});

router.get('/spots', (req, res) => controller.spotsController.show(req, res));

router.get('/spot/:id', (req, res) => controller.spotsController.showDetail(req, res));

router.get('/spot/:id/modify', (req, res) => controller.spotsController.showModify(req, res));

router.get('/boards', (req, res) => controller.boardController.show(req, res));

router.get('/board/:id', (req, res) => controller.boardController.showDetail(req, res));

router.get('/board/:id/modify', (req, res) => controller.boardController.showModify(req, res));

router.get('/reports', (req, res) => controller.reportsController.show(req, res));

router.get('/report/:id', (req, res) => controller.reportsController.showDetail(req, res));

router.get('/licensing-requests', (req, res) => controller.licenseController.show(req, res));

router.get('/licensing-requests/:id', (req, res) => controller.licenseController.showDetail(req, res));



export default router;
