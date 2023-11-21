import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from '../reducers/user';

/**
 * API 요청
 * @returns axios 결과
 */
function loadUserAPI() {
  return axios.get('/user');
}

/**
 * 서버에 요청하는 제너레이터 함수
 */
function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    console.log('@@@@', result);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: error.response.data,
    });
  }
}

/**
 * API 요청
 * @returns axios 결과
 */
// function followAPI(data) {
//   return axios.post('/api/follow', data);
// }

/**
 * 서버에 요청하는 제너레이터 함수
 */
function* follow(action) {
  try {
    // const result = yield call(followAPI, action.data);
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: FOLLOW_FAILURE,
      error: error.response.data,
    });
  }
}
/**
 * API 요청
 * @returns axios 결과
 */
// function unfollowAPI(data) {
//   return axios.post('/api/unfollow', data);
// }

/**
 * 서버에 요청하는 제너레이터 함수
 */
function* unfollow(action) {
  try {
    // const result = yield call(unfollowAPI, action.data);
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    console.log('error::', error);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: error.response.data,
    });
  }
}
/**
 * API 요청
 * @returns axios 결과
 */
function logInAPI(data) {
  return axios.post('/user/login', data);
}

/**
 * 서버에 요청하는 제너레이터 함수
 */
function* logIn(action) {
  try {
    console.log(action);
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data,
    });
  }
}
function logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    });
  }
}

function signUpAPI(data) {
  return axios.post('/user', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: null,
    });
  } catch (error) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn); //logIn 이란 액션이 실행될 때 까지 기다리겠다
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
