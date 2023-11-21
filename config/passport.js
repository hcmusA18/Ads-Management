import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { getOfficerByUsername, getOfficerByGoogleID } from '../services/officerService.js'

const passportConfig = (passport) => {
  // console.log('passport config');
  passport.use(
    new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, async (username, password, done) => {
      try {
        // console.log('passport local strategy')
        const officer = await getOfficerByUsername(username);
        if (!officer || officer.password !== password) {
          // console.log('login failed')
          return done(null, false, { message: 'Incorrect password or username.' })
        }
        // console.log('login success')
        // console.log(officer)
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
      async (accessToken, refreshToken, profile, done) => {
        try {
          const officer = await getOfficerByGoogleID(profile.id);
          if (!officer) {
            return done(null, false, { message: 'Invalid account.' })
          }
          // console.log('Google login success');
          // console.log(officer);
        } catch (error) {
          // console.log('Google login error');
          return done(error)
        }
        // console.log(profile)
        return done(null, officer)
      }
    )
  )

  passport.serializeUser((officer, done) => {
    done(null, officer.username)
  })

  passport.deserializeUser(async (username, done) => {
    try {
      const officer = await getOfficerByUsername(username);
      done(null, officer);
    } catch (error) {
      done(error)
    }
  })
}

export default passportConfig
