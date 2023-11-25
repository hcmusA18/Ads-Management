import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import dotenv from 'dotenv'
import soRoutes from './routes/soRoutes.js'
import quanRoutes from './routes/quanRoutes.js'
import phuongRoutes from './routes/phuongRoutes.js'
import { loginController, ggLoginController } from './controllers/authController.js'
// middleware import
import morgan from 'morgan'
import cors from 'cors'
import { checkAuth } from './middleware/authMiddleware.js'

//mongodb - mongoose import
import mongoose from 'mongoose'

// Authentication passport + session
import passport from 'passport'
import session from 'express-session'
import passportConfig from './config/passport.js';

const PORT = process.env.PORT || 8080
const __filename = fileURLToPath(import.meta.url) // return the current file name
const __dirname = path.dirname(__filename) // return the current directory name
const app = express()


dotenv.config(path.join(__dirname, '.env'))

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Passport and session usage
passportConfig(passport);
app.use(session({
  secret: process.env.SESSION_KEY, // secret key
  resave: false,
  saveUninitialized: false
  // use local session, session store will be cleared when the server restarts
}));
app.use(passport.initialize());
app.use(passport.session());

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
app.post('/login', loginController);
app.delete('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
app.use('/so', soRoutes)
app.use('/quan', quanRoutes)
app.use('/phuong', phuongRoutes)
// app.use('/so', checkAuth, soRoutes)
// app.use('/quan', checkAuth, quanRoutes)
// app.use('/phuong', checkAuth, phuongRoutes)

// Google OAuth login route
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));
app.get('/oauth2/redirect/google', ggLoginController);

// EJS
app.set('view engine', 'ejs');
app.locals.generateDetailLink = ({id, linkDetails}) => {
  const { basePath, category } = linkDetails;
  if (category) {
    return `${basePath}/${id}?category=${category}`;
  }
  return `${basePath}/${id}`;
}

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

// Middleware
app.use(morgan('dev'))
app.use(cors())

//MongoDB connection
mongoose.connect(process.env.MONGO_URI,)
.then(() => {
  console.log("Connected to MongoDB successfullly.");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  });
})
.catch((error) => {
  console.log(error);
})
