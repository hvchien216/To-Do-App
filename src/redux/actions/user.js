import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT
} from './../types';

export const loginUser = (email, password, history, setSubmitting) => dispatch => {
  dispatch({
    type: LOGIN,
    payload: {
      email,
      password,
      history,
      setSubmitting
    }
  })
}

export const loginUserSuccess = (data, history) => dispatch => {
  history.push('/');
  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      data
    }
  })
}

export const loginUserFailed = (err, setSubmitting) => dispatch => {
  setSubmitting(false);
  dispatch({
    type: LOGIN_FAILED,
    payload: {
      err
    }
  })
}

export const savedToLocal = data => {
  const { user, token } = data;
  const dataSaved = { user, token };
  localStorage.setItem('user', JSON.stringify(dataSaved));
}

export const logoutUser = () => dispatch => {
  deleteToLocal();
  dispatch({
    type: LOGOUT,
  })
}

export const deleteToLocal = () => {
  localStorage.removeItem('user');
}

export const registerUser = (name, email, password, history, setSubmitting) => dispatch => {
  dispatch({
    type: REGISTER,
    payload: {
      name,
      email,
      password,
      history,
      setSubmitting
    }
  })
}

export const registerUserSuccess = (data, history) => dispatch => {
  history.push('/login');
  dispatch({
    type: REGISTER_SUCCESS,
    payload: {
      data
    }
  })
}

export const registerUserFailed = (err, setSubmitting) => dispatch => {
  setSubmitting(false);
  dispatch({
    type: REGISTER_FAILED,
    payload: {
      err
    }
  })
}
