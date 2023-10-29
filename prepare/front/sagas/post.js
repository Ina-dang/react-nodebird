import axios, { all } from 'axios';
import { call, fork, put, takeLatest } from 'redux-saga/effects';

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
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
function* watchAddPost() {
  //takeLatest => 프론트에서 앞에꺼 무시하고 마지막만 실행해준다. 이거랑 별개로 백앤드도 유효성 검사 해줘야한다!
  //throttle => 2초동안 1번만 실행하도록 조절
  yield takeLatest('ADD_POST_REQUEST', addPost, 2000);
}
