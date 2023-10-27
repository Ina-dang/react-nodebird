import { all, fork, call, put, take } from 'redux-saga/effects';
import axios from 'axios';

// 제너레이터 함수는 테스트하기 좋음

/**
 * API 요청
 * @returns axios 결과
 */
function logInAPI(data) {
  return axios.post('/api/login', data);
}

/**
 * 서버에 요청하는 제너레이터 함수
 */
function* logIn(action) {
  try {
    //인수가 여러개일때는 const result = yield call(logInAPI, action.data, 'a','b','c') 처럼 함수뒤에 매개변수들로 들어감
    const result = yield call(logInAPI, action.data);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: error.response.data,
    });
  }
}
function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: error.response.data,
    });
  }
}
function addPostAPI(data) {
  return axios.post('/api/post', data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: error.response.data,
    });
  }
}

function* watchLogIn() {
  yield take('LOG_IN_REQUEST', logIn); //logIn 이란 액션이 실행될 때 까지 기다리겠다
}

function* watchLogOut() {
  yield take('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost() {
  yield take('ADD_POST_REQUEST', addPost);
}

/**
 * fork 또는 call로 실행
 * frok: 비동기 함수 호출 (논블로킹)
 * call: 동기 함수 호출 (블로킹)
 * all은 모두 동시에 실행
 */
export default function* rootSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchAddPost)]);
}
