import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import Officer from '../models/officerModel.js'

const passportConfig = (passport) => {
  // console.log('passport config');
  const officer = {
    username: 'admin1',
    password: 'admin',
    email: 'admin@gmail.com',
    position: 1
  }
  passport.use(
    new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, async (username, password, done) => {
      try {
        // console.log('passport local strategy')
        //   const officer = await Officer.findOne({ username: username })
        if (!officer || officer.password !== password) {
          // console.log('login failed')
          return done(null, false, { message: 'Incorrect password or username.' })
        }
        // console.log('login success')
        return done(null, officer)
      } catch (error) {
        // console.log('login error')
        return done(error)
      }
    })
  )

  passport.use(
    new GoogleStrategy(
      {
        // options for google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/oauth2/redirect/google',
      },
      (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        // Officer.findOne({ googleId: profile.id }).then((currentUser) => {
        //   if (currentUser) {
        //     // already have this user
        //     console.log('user is: ', currentUser)
        //     done(null, currentUser)
        //   } else {
        //     // if not, create user in our db
        //     new Officer({
        //       googleId: profile.id,
        //       username: profile.displayName,
        //       thumbnail: profile._json.image.url
        //     })
        //       .save()
        //       .then((newUser) => {
        //         console.log('created new user: ', newUser)
        //         done(null, newUser)
        //       })
        //   }
        // })
        console.log(profile)
        return done(null, officer)
      }
    )
  )

  passport.serializeUser((officer, done) => {
    done(null, officer.username)
  })

  passport.deserializeUser(async (username, done) => {
    try {
      //   const officer = await Officer.findOne({ username: username })
      done(null, officer)
    } catch (error) {
      done(error)
    }
  })
}

export default passportConfig
