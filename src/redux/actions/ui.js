import {
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_SIDEBAR,
  HIDE_SIDEBAR
} from './../types';

export const showLoading = () => dispatch => {
  dispatch({
    type: SHOW_LOADING
  })
}
export const hideLoading = () => dispatch => {
  dispatch({
    type: HIDE_LOADING
  })
}
export const showSideBar = () => dispatch => {
  dispatch({
    type: SHOW_SIDEBAR
  })
}
export const hideSideBar = () => dispatch => {
  dispatch({
    type: HIDE_SIDEBAR
  })
}