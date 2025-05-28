const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const db = require('../db');

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0]

        if (result.rowCount === 0) {
            return done(null, false, { error: 'Wrong email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { error: 'Wrong email or password' });
        }

        done(null, user);
    } catch (err) {
        done(err);
    }
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE google_id = $1', [profile.id]);
        const user = result.rows[0];

        if (user) {
            return done(null, user);
        }

        const newUser = (await db.query('INSERT INTO users (id, username, email, google_id) VALUES (gen_random_uuid(), $1, $2, $3) RETURNING *', [profile.displayName, profile.emails[0].value, profile.id])).rows[0];
        done(null, newUser);
    } catch(err) {
        done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (user_id, done) => {
    try {
        console.log('deserialize success');
        const result = await db.query('SELECT * FROM users WHERE id = $1', [user_id]);
        const user = result.rows[0];

        if (result.rowCount === 0) {
            return done(new Error('User not found'))
        }

        done(null, user);
    } catch(err) {
        done(err);
    }
});