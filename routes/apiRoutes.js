import express from 'express'

const router = express.Router()
import * as api from '../controllers/api/index.js'

export const setHeaders = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Origin, Origin');
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Content-Type', 'application/json');
  next();
}

router.get('/spots', (req, res) => {
  api
    .getAllSpots(req.query.districtID, req.query.wardID)
    .then((spots) => res.status(200).json(spots))
    .catch((err) => res.status(500).json({ message: err.message }))
})

router.get('/spots/:spotID', (req, res) => {
  // set cross origin request headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  api
    .getDetailSpot(req.params.spotID)
    .then((spot) => res.status(200).json(spot))
    .catch((err) => res.status(500).json({ message: err.message }))
})

router.get('/reports/:reportID', (req, res) => {
  // set cross origin request headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  api
    .getReport(req.params.reportID)
    .then((report) => res.status(200).json(report))
    .catch((err) => res.status(500).json({ message: err.message }))
});

router.get('/boards/:boardID', (req, res) => {
  api
    .getBoard(req.params.boardID)
    .then((board) => res.status(200).json(board))
    .catch((err) => res.status(500).json({ message: err.message }))
});

router.post('/reports', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    console.log('Missing report data');
    console.log(res.headers);
    return res.status(400).json({ message: 'Missing report data' })
  } else {
    console.log(req.body);
  }
  api
    .createReport(req.body)
    .then((report) => res.status(200).json(report))
    .catch((err) => res.status(500).json({ message: err.message }))
});

router.get('/report-types', (req, res) => {
  api
    .getAllReportTypes()
    .then((reportTypes) => res.status(200).json(reportTypes))
    .catch((err) => res.status(500).json({ message: err.message }))
});
export default router
