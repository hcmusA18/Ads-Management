import express from 'express'

const router = express.Router()
import * as api from '../controllers/api/index.js'

router.get('/spots', (req, res) => {
  // set cross origin request headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  api
    .getAllSpots()
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

export default router
