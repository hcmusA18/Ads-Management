import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('quan/index');
});

router.get('/baocao', (req, res) => {
  res.render('quan/Baocao');
});

export default router;
