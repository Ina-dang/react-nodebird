const express = require('express');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공...');
  })
  .catch(() => {
    console.log('db 연결 실패...');
  });

//서버에 json,urlencoded 장착
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * 자주쓰는 요청들
 * app.get -> 가져오다
 * app.post -> 생성하다
 * app.put -> 전체수정 (통째로 덮어씌움) 그래서 patch를 더많이씀
 * app.delete -> 제거
 * app.patch -> 부분수정 (내용중 닉네임만 수정하거나..)
 * app.options -> 요청보낼 수 있는지 찔러보기
 * app.head -> 헤더만 가져오기
 */

app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/api', (req, res) => {
  res.send('hello express api');
});

app.get('/api/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ]);
});

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행 중');
});
