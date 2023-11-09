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

router.get('/bangquangcao', (req, res) => {
  res.render('quan/BangQC', { title: 'Quận - Bảng Quảng cáo' });
})

router.get('/yeucau/cp', (req, res) => {
  res.render('quan/YeuCauCP', { title: 'Quận - Yêu cầu cấp phép' });
})

router.get('/diemdat/:id', (req, res) => {
  res.render('quan/ChitietDiemDat', { title: 'Quận - Chi tiết điểm đặt' });
})

router.get('/bangquangcao/:id', (req, res) => {
  res.render('quan/ChitietBangQC', { title: 'Quận - Chi tiết bảng quảng cáo' });
})

router.get('/yeucau/cs/diemdat/:id', (req, res) => {
  res.render('quan/YeuCauCS-diem', { title: 'Quận - Yêu cầu chỉnh sửa điểm đặt' });
})

router.get('/yeucau/cs/bangquangcao/:id', (req, res) => {
  res.render('quan/YeuCauCS-bang', { title: 'Quận - Yêu cầu chỉnh sửa bảng quảng cáo' });
})

router.get('/baocao/:id', (req, res) => {
  res.render('quan/ChitietBC', { title: 'Quận - Chi tiết báo cáo' });
})

export default router;
