const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const passport = require('passport');
require('../passport/passport');
const { ensureAuthenticated } = require('../middleware/auth');

const authRouter = express.Router();

authRouter.post('/register', async (req, res, next) => {
    const { email, username, password } = req.body;

    try {
        if (!email || !username || !password) {
            return res.status(422).json({ error: 'email and password are required' });
        }
        if ((await db.query('SELECT * FROM users WHERE email = $1', [email])).rowCount !== 0) {
            return res.status(409).json({ error: 'email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = (await db.query('INSERT INTO users (id, email, username, password) VALUES (gen_random_uuid(), $1, $2, $3) RETURNING *', [email, username, hashedPassword])).rows[0];

        res.status(201).json({ id: newUser.id, email: newUser.email, username: newUser.username });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

authRouter.post('/login', async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'Something went wrong' });
        }

        if (!user) {
            return res.status(401).json(info);
        }

        req.login(user, (error) => {
            if (error) { 
                return res.status(500).json({ error: 'Something went wrong' }); 
            }
            
            return res.status(200).json({id: user.id, username: user.username, email: user.email});
        });
    })(req, res)
});

authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}));

authRouter.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: false}), (req, res, next) => {
    res.redirect(process.env.FRONTEND_URL);
});

authRouter.get('/logout', (req, res) => {
    req.logout((error) => {
        if(error) {
            return res.status(500).json({error: 'Something went wrong'});
        }

        res.status(204).send();
    });
});

authRouter.get('/me', ensureAuthenticated, (req, res) => {
    res.json({id: req.user.id, username: req.user.username, email: req.user.email});
});

module.exports = authRouter;