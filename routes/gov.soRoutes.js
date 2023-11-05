import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('so/index');
});

router.get('/lhqc', (req, res) => {
  res.render('so/LoaihinhQC', { title: 'Sở - LHQC' });
});

router.get('/htbc', (req, res) => {
  res.render('so/HinhthucBC', { title: 'Sở - HTBC' });
});

router.get('/qlquan', (req, res) => {
  res.render('so/QLQuan', { title: 'Sở - QLQuan' });
});

router.get('/qlphuong', (req, res) => {
  res.render('so/QLPhuong', { title: 'Sở - QLPhuong' });
});

router.get('/yeucau', (req, res) => {
  res.render('so/YeucauCP', { title: 'Sở - YeucauCP' });
});

router.get('/yeucau/cp', (req, res) => {
  res.render('so/YeucauCP', { title: 'Sở - YeucauCP' });
});

router.get('/yeucau/cs', (req, res) => {
  res.render('so/YeucauCS', { title: 'Sở - YeucauCS' });
});

router.get('/yeucau/:id', (req, res) => {
  res.render('so/ChiTietYeuCau', { title: 'Sở - ChiTietYeuCau' });
});

router.get('/phancong', (req, res) => {
  res.render('so/Phancong', { title: 'Sở - Phancong' });
});

router.get('/ctbc', (req, res) => {
  res.render('so/ChitietBC', { title: 'Sở - ChitietBC' });
});

router.get('/baocao', (req, res) => {
  res.render('so/ThongKeBC', { title: 'Sở - ThongKeBC' });
})

export default router;
