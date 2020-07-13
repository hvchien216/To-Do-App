import taskApi from './../../api/taskApi';
import {
  ADD_TASK,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILED,
  FETCH_TASK,
  FETCH_TASK_FAILED,
  FETCH_TASK_SUCCESS,
  FILTER_TASK,
  FILTER_TASK_SUCCESS,
  SET_TASK_EDITING,
  UPDATE_TASK,
  UPDATE_TASK_FAILED,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILED,
} from './../types';

export const fetchListTask = q => dispatch => {
  dispatch({
    type: FETCH_TASK,
    payload: {
      q
    }
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

export const addTask = (title, description) => dispatch => {
  dispatch({
    type: ADD_TASK,
    payload: {
      title,
      description
    }
  })
}

export const addTaskSuccess = data => dispatch => {
  dispatch({
    type: ADD_TASK_SUCCESS,
    payload: {
      data
    }
  })
}

export const addTaskFailed = err => dispatch => {
  dispatch({
    type: ADD_TASK_FAILED,
    payload: {
      err
    }
  })
}

export const setTaskEditing = task => dispatch => {
  dispatch({
    type: SET_TASK_EDITING,
    payload: {
      task
    }
  })
}

export const updateTask = (_id, title, description, status) => dispatch => {
  console.log("data of updateTask===>", {
    _id, title, description, status
  })
  dispatch({
    type: UPDATE_TASK,
    payload: {
      _id,
      title,
      description,
      status
    }
  })
}

export const updateTaskSuccess = data => dispatch => {
  dispatch({
    type: UPDATE_TASK_SUCCESS,
    payload: {
      data
    }
  })
}

export const updateTaskFailed = err => dispatch => {
  dispatch({
    type: UPDATE_TASK_FAILED,
    payload: {
      err
    }
  })
}

export const deleteTask = (_id) => dispatch => {
  dispatch({
    type: DELETE_TASK,
    payload: {
      _id,
    }
  })
}

export const deleteTaskSuccess = data => dispatch => {
  dispatch({
    type: DELETE_TASK_SUCCESS,
    payload: {
      data
    }
  })
}

export const deleteTaskFailed = err => dispatch => {
  dispatch({
    type: DELETE_TASK_FAILED,
    payload: {
      err
    }
  })
}