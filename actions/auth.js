import * as types from '/actions';
import { MESSAGE_ACTION } from '/constants';
import { apiRequest } from '/helpers/api_helper';

const endpoint = 'auth';

const loginStart = () => ({ type: types.LOG_USER_IN });
const loginSuccess = (message) => ({ type: types.LOG_USER_IN_SUCCESS, message });
const loginFailure = (message) => ({ type: types.LOG_USER_IN_FAILURE, message });

export const login = (user) => dispatch => {
  dispatch(loginStart());
  
  return apiRequest.post(`${endpoint}/login`)
    .send(user)
    .then(({ body }) => {
      if (body.status) {
        dispatch(loginSuccess({ text: body.message, action: MESSAGE_ACTION.RELOAD }));
      }
      else {
        dispatch(loginFailure({ text: body.message, action: MESSAGE_ACTION.NONE }));
      }
    })
    .catch(({ message }) => {
      console.log('[ERROR] login.catch', message);
      dispatch(loginFailure({ text: message, action: MESSAGE_ACTION.NONE }));
    });
}

const logoutStart = () => ({ type: types.LOG_USER_OUT });
const logoutSuccess = (message) => ({ type: types.LOG_USER_OUT_SUCCESS, message });
const logoutFailure = (message) => ({ type: types.LOG_USER_OUT_FAILURE, message });

export const logout = (token) => dispatch => {
  dispatch(logoutStart());

  return apiRequest.post(`${endpoint}/logout`)
    .send({ token })
    .then(({ body }) => {
      if (body.status) {
        dispatch(logoutSuccess({ text: body.message, action: MESSAGE_ACTION.RELOAD }));
      }
      else {
        dispatch(logoutFailure({ text: body.message, action: MESSAGE_ACTION.NONE }));
      }
    })
    .catch(({ message }) => {
      console.log('[ERROR] logout.catch', message);
      dispatch(logoutFailure({ text: message, action: MESSAGE_ACTION.NONE }));
    });
}

const registerStart = () => ({ type: types.REGISTER_USER });
const registerSuccess = (message) => ({ type: types.REGISTER_USER_SUCCESS, message });
const registerFailure = (message) => ({ type: types.REGISTER_USER_FAILURE, message });

export const register = (user) => dispatch => {
  dispatch(registerStart());

  return apiRequest.post(`${endpoint}/create`)
    .send(user)
    .then(({ body }) => {
      if (body.status) {
        dispatch(registerSuccess({ text: body.message, action: MESSAGE_ACTION.RELOAD }));
      }
      else {
        dispatch(registerFailure({ text: body.message, action: MESSAGE_ACTION.NONE }));
      }
    })
    .catch(({ message }) => {
      console.log('[ERROR] register.catch', message);
      dispatch(registerFailure({ text: message, action: MESSAGE_ACTION.NONE }));
    })
}

export const setMessage = (message) => ({ type: types.SET_MESSAGE, message });

export const setSession = session => {
  return { 
    type: types.SET_SESSION, 
    session 
  }
}