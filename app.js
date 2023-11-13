import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import soRoutes from './routes/gov.soRoutes.js'
import quanRoutes from './routes/gov.quanRoutes.js'
import phuongRoutes from './routes/gov.phuongRoutes.js'

const PORT = process.env.PORT || 3000
const __dirname = path.resolve() // return the current working directory
const app = express()

dotenv.config(path.join(__dirname, '.env'))
// Government

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});
