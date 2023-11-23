const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const dotenv = require('dotenv');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공...');
  })
  .catch(() => {
    console.log('db 연결 실패...');
  });

passportConfig();
app.use(morgan('dev'));

//서버에 json,urlencoded 장착
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use('/', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/api', (req, res) => {
  res.send('hello express api');
});

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);

/*
app.use((err, req, res, next) => {
  // 에러처리 미들웨어는 매개변수 4개
  // 기본적으로 들어있지만 특별하게 처리하고싶으면 이처럼 따로 미들웨어로 추가해준다
});
 */

app.listen(3060, () => {
  console.log('서버 실행 중');
});
