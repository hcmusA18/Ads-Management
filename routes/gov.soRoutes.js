import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('so/index');
});

router.get('/lhqc', (req, res) => {
  res.render('so/LoaihinhQC');
});

router.get('/qlquan', (req, res) => {
  res.render('so/QLQuan');
});

router.get('/qlphuong', (req, res) => {
  res.render('so/QLPhuong');
});

router.get('/yeucau/cp', (req, res) => {
  res.render('so/YeucauCP');
});

router.get('/yeucau/cs', (req, res) => {
  res.render('so/YeucauCS');
});

router.get('/phancong', (req, res) => {
  res.render('so/Phancong');
});

export default router;
