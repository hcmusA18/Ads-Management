import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('phuong/index', { title: 'Phường - Trang chủ' });
});


router.get('/ddqc', (req, res) => {
  res.render('phuong/ddqc', { title: 'Phường - Điểm đặt' });
});
export default router;
