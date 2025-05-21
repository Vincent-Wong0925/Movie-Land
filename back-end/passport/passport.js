const passport = require('passport');
const LocalStrategy = require('passport-local');
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

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (user_id, done) => {
    try {
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