const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bcrypt = require('bcrypt')
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
// const config = require('../config')

passport.serializeUser((user, cb) => {
    cb(null, user._id)
})

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) {
            return cb(err)
        }

        const cleanUser = user.toObject()
        delete cleanUser.password

        cb(null, cleanUser)
    })
})

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        function(email, password, done) {
            User.findOne({ email }, function(err, user) {
                if (err) {
                    return done(err)
                }

                if (!user) {
                    return done(null, false, { message: 'Incorrect email.' })
                }

                if (!user.password) {
                    return done(null, false, {
                        message: 'Password not set, please contact support or log in with social.',
                    })
                }

                const passwordsMatch = bcrypt.compareSync(password, user.password)
                if (!passwordsMatch) {
                    return done(null, false, { message: 'Incorrect password.' })
                }
                return done(null, user)
            })
        }
    )
)

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: config.GOOGLE_CLIENT_ID,
//             clientSecret: config.GOOGLE_CLIENT_SECRET,
//             callbackURL: '/auth/google/cb',
//         },
//         (accessToken, refreshToken, profile, done) => {
//             const email = profile.emails[0].value
//             User.findOne({ $or: [{ googleId: profile.id }, { email }] })
//                 .then(user => {
//                     if (user) {
//                         if (!user.googleId) user.googleId = profile.id

//                         user.save(() => {})

//                         return done(null, user)
//                     }

//                     const newUser = new User({
//                         googleId: profile.id,
//                         email,
//                     })

//                     newUser.save().then(user => {
//                         done(null, newUser)
//                     })
//                 })
//                 .catch(error => {
//                     done(error)
//                 })
//         }
//     )
// )