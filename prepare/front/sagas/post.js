/* eslint-disable no-unused-vars */
import axios, { all } from 'axios';
import { call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from '../reducers/post';

function addPostAPI(data) {
  return axios.post('/api/post', data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      // data: result.data,
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}
function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      // data: result.data,
    });
  } catch (error) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: error.response.data,
    });
  }
}
function* watchAddPost() {
  //takeLatest => 프론트에서 앞에꺼 무시하고 마지막만 실행해준다. 이거랑 별개로 백앤드도 유효성 검사 해줘야한다!
  //throttle => 2초동안 1번만 실행하도록 조절
  yield takeLatest(ADD_POST_REQUEST, addPost, 2000);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment, 2000);
}

export default function* postSaga() {
  yield all([fork(watchAddPost, watchAddComment)]);
}
