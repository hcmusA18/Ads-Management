import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('phuong/index', { title: 'Phường - Trang chủ' });
});

export default router;
