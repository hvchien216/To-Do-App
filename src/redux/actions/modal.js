import {
  SHOW_MODAL,
  HIDE_MODAL,
  CHANGE_MODAL_CONTENT,
  CHANGE_MODAL_TITLE,
} from '../types';

export const showModal = () => dispatch => {
  dispatch({
    type: SHOW_MODAL
  })
}
export const hideModal = () => dispatch => {
  dispatch({
    type: HIDE_MODAL
  })
}
export const changeModalTitle = title => dispatch => {
  dispatch({
    type: CHANGE_MODAL_TITLE,
    payload: {
      title
    }
  })
}
export const changeModalContent = component => dispatch => {
  dispatch({
    type: CHANGE_MODAL_CONTENT,
    payload: {
      component
    }
  })
}