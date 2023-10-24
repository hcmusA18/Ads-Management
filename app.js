import express from 'express'
import path from 'path'
import http from 'http'
import govRoutes from './routes/govRoutes.js'
import citizenRoutes from './routes/citizenRoutes.js'

const GOV_PORT = 3000
const CITIZEN_PORT = 4000
const __dirname = path.resolve() // return the current working directory
const appCitizen = express()
const appGov = express()

// Citizen

// Public folder
appCitizen.use(express.static(path.join(__dirname, 'citizen/public')))

//Views folder
appCitizen.set('views', path.join(__dirname, 'citizen/views'))

// Routes
appCitizen.use('/', citizenRoutes);

// EJS
appCitizen.set('view engine', 'ejs')

// Start the server
const serverCitizen = http.createServer(appCitizen);
serverCitizen.listen(CITIZEN_PORT, () => {
  console.log(`Citizen server is running at http://localhost:${CITIZEN_PORT}`)
})




// Government

// Public folder
appGov.use(express.static(path.join(__dirname, 'government/public')))

//Views folder
appGov.set('views', path.join(__dirname, 'government/views'))

// Routes
appGov.use('/', govRoutes)

// EJS
appGov.set('view engine', 'ejs')

// Start the server
const serverGov = http.createServer(appGov);
serverGov.listen(GOV_PORT, () => {
  console.log(`Government server is running at http://localhost:${GOV_PORT}`)
})





