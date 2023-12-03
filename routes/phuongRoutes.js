import express from 'express';
import controller from '../controllers/official/index.js';

const router = express.Router();

router.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
})
router.get('/', (req, res) => controller.indexController.show(req, res));
router.get('/ads', (req, res) => controller.adsController.show(req, res));
router.get('/ads/:id', (req, res) => controller.adsController.showDetail(req, res));
router.get('/ads/:id/modify', (req, res) => controller.adsController.showModify(req, res));
router.get('/reports', (req, res) => controller.reportsController.show(req, res));

router.get('/reports/:id', (req, res) => controller.reportsController.showDetail(req, res));

router.get('/license', (req, res) => controller.licenseController.show(req, res));

router.get('/license/create', (req, res) => controller.licenseController.showCreate(req, res, false));

router.get('/license/:id', (req, res) => controller.licenseController.showDetailOrCreate(req, res, true));

export default router;
