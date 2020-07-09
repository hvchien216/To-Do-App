import {
  fork,
  take,
  call,
  put,
  delay,
  takeLatest,
  select
} from 'redux-saga/effects';
import { FETCH_TASK, FILTER_TASK } from './../redux/types';
import { fetchListTaskSuccess, fetchListTaskFailed, filterTaskSuccess } from './../redux/actions/task';
import { showLoading, hideLoading } from './../redux/actions/ui';

import taskApi from './../api/taskApi';
// import { STATUS_CODE } from './../contants';
function* watchFetchListTaskAction() {
  while (true) {
    yield take(FETCH_TASK);
    yield put(showLoading());
    try {
      const { data } = yield call(taskApi.getAll);
      yield put(fetchListTaskSuccess(data.data));
    } catch (error) {
      yield put(fetchListTaskFailed(error));
    }
    delay(500);
    yield put(hideLoading());
  }
}

function* watchCreateTaskAction() {
  console.log('huhu create task')
}

function* filterTaskSaga({ payload }) {
  yield delay(500);
  const { keyword } = payload;
  const list = yield select(state => state.task.listTask);
  const filterTask = list.filter(task =>
    task.title
      .trim()
      .toLowerCase()
      .includes(keyword.trim().toLowerCase())
  )
  yield put(filterTaskSuccess(filterTask));
}

function* rootSaga() {
  yield true;
  yield fork(watchFetchListTaskAction);
  yield fork(watchCreateTaskAction);
  yield takeLatest(FILTER_TASK, filterTaskSaga);
}

export default rootSaga;