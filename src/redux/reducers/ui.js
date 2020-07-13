import {
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_SIDEBAR,
  HIDE_SIDEBAR
} from './../types';

const initialState = {
  showLoading: false,
  showSideBar: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADING: {
      return {
        ...state,
        showLoading: true,
      }
    }
    case HIDE_LOADING: {
      return {
        ...state,
        showLoading: false,
      }
    }
    case SHOW_SIDEBAR: {
      return {
        ...state,
        showSideBar: true,
      }
    }
    case HIDE_SIDEBAR: {
      return {
        ...state,
        showSideBar: false,
      }
    }
    default:
      return state;
  }
}