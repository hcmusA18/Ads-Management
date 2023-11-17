import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import dotenv from 'dotenv'
import soRoutes from './routes/soRoutes.js'
import quanRoutes from './routes/quanRoutes.js'
import phuongRoutes from './routes/phuongRoutes.js'
// middleware import
import morgan from 'morgan'
import cors from 'cors'

const PORT = process.env.PORT || 8080
const __filename = fileURLToPath(import.meta.url) // return the current file name
const __dirname = path.dirname(__filename) // return the current directory name
const app = express()

dotenv.config(path.join(__dirname, '.env'))

// Public folder
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory))
app.use((req, res, next) => {
  res.locals.url = req.originalUrl
  res.locals.host = req.get('host')
  res.locals.protocol = req.protocol
  next()
})

//Views folder
app.set('views', path.join(__dirname, 'views'))
console.log(`${app.get('views')}`)
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
  res.render('error', { title: 'Error', error: error })

})

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
//   send the tree of the directory
  res.send('User-agent: *');
  res.send('Disallow: /');
  res.send('Allow: /$');
  res.send('Allow: /so');

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
