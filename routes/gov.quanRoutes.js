import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('quan/index', { title: 'Quận - Trang chủ' });
});

router.get('/baocao', (req, res) => {
  res.render('quan/BaoCao', { title: 'Quận - Báo cáo' });
});

router.get('/diemdat', (req, res) => {
  res.render('quan/Diemdat', { title: 'Quận - Điểm đặt' });
})

router.get('/diemdat/:id', (req, res) => {
  res.render('quan/ChitietDiemDat', { title: 'Quận - Chi tiết điểm đặt' });
})

router.get('/yeucau/cs/:id', (req, res) => {
  res.render('quan/YeuCauCS', { title: 'Quận - Yêu cầu chỉnh sửa' });
})

router.get('/baocao/:id', (req, res) => {
  res.render('quan/ChitietBC', { title: 'Quận - Chi tiết báo cáo' });
})

export default router;
