import {
  SHOW_MODAL,
  HIDE_MODAL,
  CHANGE_MODAL_CONTENT,
  CHANGE_MODAL_TITLE,
} from '../types';

const initialState = {
  showModal: false,
  title: '',
  component: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL: {
      return {
        ...state,
        showModal: true,
      }
    }
    case HIDE_MODAL: {
      return {
        ...state,
        showModal: false,
      }
    }
    case CHANGE_MODAL_CONTENT: {
      const { component } = action.payload;
      return {
        ...state,
        component
      }
    }
    case CHANGE_MODAL_TITLE: {
      const { title } = action.payload;
      return {
        ...state,
        title
      }
    }
    default:
      return state;
  }
}