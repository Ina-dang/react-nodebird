import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}

/**
 * API 요청
 * @returns axios 결과
 */
// function logInAPI(data) {
//   return axios.post('/api/login', data);
// }

/**
 * 서버에 요청하는 제너레이터 함수
 */
function* logIn(action) {
  try {
    //인수가 여러개일때는 const result = yield call(logInAPI, action.data, 'a','b','c') 처럼 함수뒤에 매개변수들로 들어감
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: error.response.data,
    });
  }
}
// function logOutAPI() {
//   return axios.post('/api/logout');
// }

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: null,
    });
  } catch (error) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: error.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest('LOG_IN_REQUEST', logIn); //logIn 이란 액션이 실행될 때 까지 기다리겠다
}

function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}
