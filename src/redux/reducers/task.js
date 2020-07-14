import {
  FETCH_TASK,
  FETCH_TASK_SUCCESS,
  FETCH_TASK_FAILED,
  FILTER_TASK,
  FILTER_TASK_SUCCESS,
  FILTER_TASK_FAILED,
  ADD_TASK,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILED,
  SET_TASK_EDITING,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILED,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILED,

} from './../types';
import { toastError, toastSuccess } from '../../helpers/toastHelper';

const initialState = {
  listTask: [],
  taskEditing: null,
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
        // listTask: []
      }
    }
    case FILTER_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listTask: data,
      };
    }
    case ADD_TASK: {
      return {
        ...state,
      }
    }
    case ADD_TASK_SUCCESS: {
      const { data } = action.payload;
      toastSuccess('Thêm mới công việc thành công');
      return {
        ...state,
        listTask: [data, ...state.listTask]
      }
    }
    case ADD_TASK_FAILED: {
      const { err } = action.payload;
      toastError(err)
      return {
        ...state,
      }
    }
    case SET_TASK_EDITING: {
      const { task } = action.payload;
      return {
        ...state,
        taskEditing: task,
      }
    }
    case UPDATE_TASK: {
      return {
        ...state,
      }
    }
    case UPDATE_TASK_SUCCESS: {
      const { data } = action.payload;
      const { listTask } = state;
      const index = listTask.findIndex(item => item._id === data._id);
      if (index !== -1) {
        toastSuccess('Cập nhật công việc thành công');

        const newList = [
          ...listTask.slice(0, index),
          data,
          ...listTask.slice(index + 1),
        ]
        return {
          ...state,
          listTask: newList,
        }
      }
      return {
        ...state
      }
    }
    case DELETE_TASK: {
      return {
        ...state,
      }
    }
    case DELETE_TASK_SUCCESS: {
      const { data } = action.payload;
      const { listTask } = state;
      toastSuccess('Xóa công việc thành công');
      return {
        ...state,
        listTask: listTask.filter(ele => ele._id !== data._id),
      }
    }
    default:
      return state;
  }
}