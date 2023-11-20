import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:3060/';

/**
 * fork 또는 call로 실행
 * frok: 비동기 함수 호출 (논블로킹)
 * call: 동기 함수 호출 (블로킹)
 * all은 모두 동시에 실행
 */
export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
