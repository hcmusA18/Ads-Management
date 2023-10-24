import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('phuong/index');
});

export default router;
