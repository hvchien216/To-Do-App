import {
  SHOW_LOADING,
  HIDE_LOADING
} from './../types';

const initialState = {
  showLoading: false,
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

    default:
      return state;
  }
}