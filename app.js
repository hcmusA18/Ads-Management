import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import soRoutes from './routes/gov.soRoutes.js'
import quanRoutes from './routes/gov.quanRoutes.js'
import phuongRoutes from './routes/gov.phuongRoutes.js'
// middleware import
import morgan from 'morgan'
import cors from 'cors'
import * as https from 'https';

const PORT = process.env.PORT || 8080
const __dirname = path.resolve() // return the current working directory
const app = express()

dotenv.config(path.join(__dirname, '.env'))

// Public folder
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
  res.locals.url = req.originalUrl
  res.locals.host = req.get('host')
  res.locals.protocol = req.protocol
  next()
})

//Views folder
app.set('views', path.join(__dirname, 'views'))

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Cán bộ' })
})
app.use('/so', soRoutes)
app.use('/quan', quanRoutes)
app.use('/phuong', phuongRoutes)

// EJS
app.set('view engine', 'ejs')

// Middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Error handler
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error) // forward the error request
})
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.render('error', { title: 'Error', error: error.message })

})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
