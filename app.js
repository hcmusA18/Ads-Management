import express from 'express'
import path from 'path'
import http from 'http'
import dotenv from 'dotenv'

import soRoutes from './routes/gov.soRoutes.js'
import quanRoutes from './routes/gov.quanRoutes.js'
import phuongRoutes from './routes/gov.phuongRoutes.js'
import citizenRoutes from './routes/citizenRoutes.js'

const GOV_PORT = 3000
const CITIZEN_PORT = 4000
const __dirname = path.resolve() // return the current working directory
const appCitizen = express()
const appGov = express()


dotenv.config(path.join(__dirname, '.env'))

// Citizen

// Public folder
appCitizen.use(express.static(path.join(__dirname, 'citizen/public')))

//Views folder
// appCitizen.set('views', path.join(__dirname, 'citizen/views'))

// Routes
appCitizen.use('/', citizenRoutes);

// Start the server
const serverCitizen = http.createServer(appCitizen);
serverCitizen.listen(CITIZEN_PORT, () => {
  console.log(`Citizen server is running at http://localhost:${CITIZEN_PORT}`)
})




// Government

// Public folder
appGov.use(express.static(path.join(__dirname, 'government/public')))
appGov.use((req, res, next) => {
  res.locals.url = req.originalUrl
  res.locals.host = req.get('host')
  res.locals.protocol = req.protocol
  next()
})

//Views folder
appGov.set('views', path.join(__dirname, 'government/views'))

// Routes
// appGov.use('/', govRoutes)
appGov.get('/', (req, res) => {
  res.render('index', { title: 'Cán bộ' })
})
appGov.use('/so', soRoutes)
appGov.use('/quan', quanRoutes)
appGov.use('/phuong', phuongRoutes)

// EJS
appGov.set('view engine', 'ejs')

// Start the server
const serverGov = http.createServer(appGov);
serverGov.listen(GOV_PORT, () => {
  console.log(`Government server is running at http://localhost:${GOV_PORT}`)
})
