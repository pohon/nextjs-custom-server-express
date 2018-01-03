import * as types from '/actions';
import { apiRequest } from '/helpers/api_helper';

const endpoint = 'chat/'

const loadMessageStart = () => ({ type: types.LOAD_MESSAGE });
const loadMessageSuccess = payload => ({ type: types.LOAD_MESSAGE_SUCCESS, payload });
const loadMessageFailure = payload => ({ type: types.LOAD_MESSAGE_FAILURE, payload });

export const loadMessage = () => dispatch => {
  dispatch(loadMessageStart());

  apiRequest.get(endpoint + 'messages')
    .then(({ body }) => {
      if(body.messages) {
        dispatch(loadMessageSuccess({ messages: body.messages }));
      }
      else {
        dispatch(loadMessageFailure({ message: 'Cannot retrieve messages or no messages yet', messages: [] }));
      }
    })
    .catch(({ message }) => {
      console.log('[ERROR] loadMessage.catch', message);
      dispatch(loadMessageSuccess({ message }));
    });
}

const loadOnlineUserStart = () => ({ type: types.LOAD_ONLINE_USER });
const loadOnlineUserSuccess = payload => ({ type: types.LOAD_ONLINE_USER_SUCCESS, payload });
const loadOnlineUserFailure = payload => ({ type: types.LOAD_ONLINE_USER_FAILURE, payload });

export const loadOnlineUser = () => dispatch => {
  dispatch(loadMessageStart());

  apiRequest.get(endpoint + 'users')
    .then(({ body }) => {
      if(body.users) {
        dispatch(loadOnlineUserSuccess({ users: body.users }));
      }
      else {
        dispatch(loadOnlineUserFailure({ message: 'Cannot retrieve users or no users yet', users: [] }));
      }
    })
    .catch(({ message }) => {
      console.log('[ERROR] loadMessage.catch', message);
      dispatch(loadOnlineUserFailure({ message }));
    });
}

export const addMessage = (message) => {
  return {
    type: types.ADD_MESSAGE,
    message
  }
}

export const addMessageSocket = (socket, message) => {
  socket.emit('addMessage', message);
  return {
    type: types.ADD_MESSAGE,
    message
  }
}

export const joinChat = (data) => {
  return {
    type: types.ADD_USER,
    username: data.username
  }
}

export const joinChatSocket = (socket, username) => {
  socket.emit('joinChat', username);
  return {
    type: types.ADD_USER,
    username
  }
}

export const leaveChat = (data) => {
  return {
    type: types.REMOVE_USER,
    username: data.username
  }
}

export const leaveChatSocket = (socket, username) => {
  socket.emit('leaveChat', username);
  return {
    type: types.REMOVE_USER,
    username
  }
}