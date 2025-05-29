const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();
const filmRouter = require('./routes/filmRouter');
const commentRouter = require('./routes/commentRouter');
const passport = require('passport');
const authRouter = require('./routes/authRouter');
const { ensureAuthenticated } = require('./middleware/auth');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000*60*60*24,
    sameSite: 'none',
    secure: false,
    httpOnly: true,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);
app.use('/filmList', ensureAuthenticated, filmRouter);
app.use('/comment', commentRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
