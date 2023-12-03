import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { getOfficerByUsername, getOfficerByGoogleID } from '../services/officerService.js'
import { comparePassword } from '../services/passwordService.js';

const passportConfig = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, async (username, password, done) => {
      try {
        // for dev only
        username = 'admin';
        password = 'admin';
        const officer = await getOfficerByUsername(username);
        if (!officer || !await comparePassword(password, officer.password)) {
          return done(null, false, { message: 'Incorrect password or username.' })
        }
        return done(null, officer)
      } catch (error) {
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
          return done(null, officer)
        } catch (error) {
          return done(error)
        }        
      }
    )
  )

  passport.serializeUser((officer, done) => {
    done(null, officer.username)
  })

  passport.deserializeUser(async (username, done) => {
    try {
      const officer = await getOfficerByUsername(username);
      done(null, officer)
    } catch (error) {
      done(error)
    }
  })
}

export default passportConfig
