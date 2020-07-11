import {
  fork,
  take,
  call,
  put,
  delay,
  takeLatest,
  select,
  takeEvery
} from 'redux-saga/effects';
import { FETCH_TASK, FILTER_TASK, ADD_TASK, UPDATE_TASK, DELETE_TASK } from './../redux/types';
import {
  fetchListTaskSuccess,
  fetchListTaskFailed,
  filterTaskSuccess,
  addTaskSuccess,
  addTaskFailed,
  fetchListTask,
  updateTaskSuccess,
  updateTaskFailed,
  deleteTaskSuccess,
  deleteTaskFailed
} from './../redux/actions/task';
import {
  showLoading,
  hideLoading
} from './../redux/actions/ui';

import taskApi from './../api/taskApi';
// import { STATUSES } from './../contants';
function* watchFetchListTaskAction() {
  while (true) {
    const { payload: { q } } = yield take(FETCH_TASK);

    yield put(showLoading());
    try {
      const { data } = yield call(taskApi.getAll,
        { q });
      yield put(fetchListTaskSuccess(data.data));
    } catch (error) {
      yield put(fetchListTaskFailed(error));
    }
    delay(500);
    yield put(hideLoading());
  }
}



function* filterTaskSaga({ payload }) {
  yield delay(500);
  const { keyword } = payload;
  yield put(fetchListTask(keyword))
  // const list = yield select(state => state.task.listTask);
  // const filterTask = list.filter(task =>
  //   task.title
  //     .trim()
  //     .toLowerCase()
  //     .includes(keyword.trim().toLowerCase())
  // )
  // yield put(filterTaskSuccess(filterTask));
}

function* addTaskSaga({ payload }) {
  const { title, description } = payload;
  yield put(showLoading());
  try {
    const { data } = yield call(taskApi.add, {
      title,
      description,
    })
    yield put(addTaskSuccess(data.data));

  } catch (error) {
    yield put(addTaskFailed(error));
  }
  delay(500);
  yield put(hideLoading());
}

function* updateTaskSaga({ payload }) {
  const { _id, title, description, status } = payload;
  yield put(showLoading());
  try {
    const { data } = yield call(taskApi.edit, _id, {
      title,
      description,
      status
    })
    yield put(updateTaskSuccess(payload));

  } catch (error) {
    yield put(updateTaskFailed(error));
  }
  delay(500);
  yield put(hideLoading());
}

function* deleteTaskSaga({ payload }) {
  const { _id } = payload;
  yield put(showLoading());
  try {
    const { data } = yield call(taskApi.delete, _id)
    yield put(deleteTaskSuccess(data.data));

  } catch (error) {
    yield put(deleteTaskFailed(error));
  }
  delay(500);
  yield put(hideLoading());
}

function* rootSaga() {
  yield true;
  yield fork(watchFetchListTaskAction);
  yield takeLatest(FILTER_TASK, filterTaskSaga);
  yield takeEvery(ADD_TASK, addTaskSaga)
  yield takeEvery(UPDATE_TASK, updateTaskSaga)
  yield takeEvery(DELETE_TASK, deleteTaskSaga)
}

export default rootSaga;