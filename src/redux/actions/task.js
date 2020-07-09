import {
  FETCH_TASK,
  FETCH_TASK_SUCCESS,
  FETCH_TASK_FAILED,
  FILTER_TASK,
  FILTER_TASK_SUCCESS,
  FILTER_TASK_FAILED
} from './../types';
import taskApi from './../../api/taskApi';

export const fetchListTask = () => dispatch => {
  dispatch({
    type: FETCH_TASK,
  })
}

export const fetchListTaskSuccess = data => dispatch => {
  dispatch({
    type: FETCH_TASK_SUCCESS,
    payload: {
      data
    }
  })
}

export const fetchListTaskFailed = err => dispatch => {
  dispatch({
    type: FETCH_TASK_FAILED,
    payload: {
      err
    }
  })
}

export const fetchListTaskRequest = () => async dispatch => {
  try {
    dispatch(fetchListTask());
    const res = await taskApi.getAll();
    const { data } = res.data;
    dispatch(fetchListTaskSuccess(data));
  } catch (err) {
    dispatch(fetchListTaskFailed(err));
    console.log(err)
  }
}

export const filterTask = keyword => dispatch => {
  dispatch({
    type: FILTER_TASK,
    payload: {
      keyword
    }
  })
}

export const filterTaskSuccess = data => dispatch => {
  dispatch({
    type: FILTER_TASK_SUCCESS,
    payload: {
      data
    }
  })
}