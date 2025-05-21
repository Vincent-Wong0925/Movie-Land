const express = require('express');
const session = require('express-session');
const cors = require('cors');
const filmRouter = require('./routes/filmRouter');
const commentRouter = require('./routes/commentRouter');
const passport = require('passport');
const authRouter = require('./routes/authRouter');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use('/', authRouter);
app.use('/filmList', filmRouter);
app.use('/comment', commentRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
