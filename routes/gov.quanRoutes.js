import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('quan/index');
});

router.get('/baocao', (req, res) => {
  res.render('quan/BaoCao', { title: 'Quận - BaoCao' });
});

router.get('/diemdat', (req, res) => {
  res.render('quan/Diemdat', { title: 'Quận - DiemDat' });
})

router.get('/diemdat/:id', (req, res) => {
  res.render('quan/ChitietDiemDat', { title: 'Quận - ChitietDiemDat' });
})

router.get('/yeucau/cs', (req, res) => {
  res.render('quan/YeuCauCS', { title: 'Quận - YeuCauChinhSua' });
})

export default router;
