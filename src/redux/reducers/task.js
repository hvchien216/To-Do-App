import {
  FETCH_TASK,
  FETCH_TASK_SUCCESS,
  FETCH_TASK_FAILED,
  FILTER_TASK,
  FILTER_TASK_SUCCESS,
  FILTER_TASK_FAILED
} from './../types';
import { toastError } from '../../helpers/toastHelper';

const initialState = {
  listTask: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TASK: {
      return {
        ...state,
        listTask: [],
      }
    }
    case FETCH_TASK_SUCCESS: {
      const { data } = action.payload
      return {
        ...state,
        listTask: data
      }
    }
    case FETCH_TASK_FAILED: {
      const { err } = action.payload;
      toastError(err)
      return {
        ...state,
        listTask: []
      }
    }
    case FILTER_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listTask: data
      }
    }
    default:
      return state;
  }
}