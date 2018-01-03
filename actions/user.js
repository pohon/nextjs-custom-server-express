import * as types from '/actions';
import { apiRequest } from '/helpers/api_helper';

const endpoint = 'users/';

const loadUserStart = () => ({ type: types.LOAD_USER });
const loadUserSuccess = payload => ({ type: types.LOAD_USER_SUCCESS, payload });
const loadUserFailure = payload => ({ type: types.LOAD_USER_FAILURE, payload });

export const loadUser = () => dispatch => {
  dispatch(loadUserStart());

  return apiRequest.get(endpoint)
    .then(({ body }) => {
      if (body.users.length > 0) {
        dispatch(loadUserSuccess({ users: body.users }));
      }
      else {
        dispatch(loadUserFailure({ users: [] }));
      }
    })
    .catch(({ message }) => {
      console.log('[ERROR] loadUser.catch', message);
      dispatch(loadUserFailure({ users: [] }));
    });
}

const getUserStart = () => ({ type: types.GET_USER });
const getUserSuccess = payload => ({ type: types.GET_USER_SUCCESS, payload });
const getUserFailure = payload => ({ type: types.GET_USER_FAILURE, payload });

export const getUser = (id) => dispatch => {
  dispatch(getUserStart());

  return apiRequest.get(endpoint + id)
    .then(({ body }) => {
      if (body.user) {
        dispatch(getUserSuccess({ user: body.user }));
      }
      else {
        dispatch(getUserFailure({ user: {} }));
      }
    })
    .catch(({ message }) => {
      console.log('[ERROR] getUser.catch', message);
      dispatch(getUserFailure({ user: {} }));
    });
}

const editUserStart = () => ({ type: types.EDIT_USER });
const editUserSuccess = () => ({ type: types.EDIT_USER_SUCCESS });
const editUserFailure = () => ({ type: types.EDIT_USER_FAILURE });

export const editUser = (user) => dispatch => {
  dispatch(editUserStart());

  return apiRequest.put(endpoint)
    .send(user)
    .then(({ body }) => {
      if (body.status) {
        dispatch(editUserSuccess());
      }
      else {
        dispatch(editUserFailure());
      }
    })
    .catch(({ message }) => {
      console.log('[ERROR] editUser.catch', message);
      dispatch(editUserFailure());
    });
}

const deleteUserStart = () => ({ type: types.DELETE_USER });
const deleteUserSuccess = (id) => ({ type: types.DELETE_USER_SUCCESS, id });
const deleteUserFailure = () => ({ type: types.DELETE_USER_FAILURE });

export const deleteUser = (id) => dispatch => {
  dispatch(deleteUserStart());

  return apiRequest.delete(endpoint)
    .send({ id })
    .then(({ body }) => {
      if (body.status) {
        dispatch(deleteUserSuccess(id));
      }
      else {
        dispatch(deleteUserFailure());
      }
    })
    .catch(({ message }) => {
      console.log('[ERROR] deleteUser.catch', message);
      dispatch(deleteUserFailure());
    })
}

const createUserStart = () => ({ type: types.CREATE_USER });
const createUserSuccess = () => ({ type: types.CREATE_USER_SUCCESS });
const createUserFailure = () => ({ type: types.CREATE_USER_FAILURE });

export const createUser = (user) => dispatch => {
  dispatch(createUserStart);

  return apiRequest.post(endpoint)
    .send(user)
    .then(({ body }) => {
      if (body.status) {
        dispatch(createUserSuccess());
      }
      else {
        dispatch(createUserFailure());
      }
    })
    .catch(({ message }) => {
      console.log('[ERROR] createUser.catch', message);
      dispatch(createUserFailure());
    });
}