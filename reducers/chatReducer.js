import * as types from '/actions';

const initialState = {
  message: '',
  isLoading: false,
  messages: [],
  users: []
}

const chatReducer = (state = initialState, action) => {
  console.log('chatReducer');
  console.log(state);
  console.log(action);
  switch(action.type) {
    case types.LOAD_MESSAGE:
      return {
        ...state,
        isLoading: true
      }
    case types.LOAD_MESSAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messages: action.payload.messages
      }
    case types.LOAD_MESSAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        messages: action.payload.messages,
        message: action.payload.message
      }
    case types.LOAD_ONLINE_USER:
      return {
        ...state,
        isLoading: true
      }
    case types.LOAD_ONLINE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload.users
      }
    case types.LOAD_ONLINE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        users: action.payload.users,
        message: action.payload.message
      }
    case types.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      }
    case types.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.username]
      }
    case types.REMOVE_USER:
      return {
        ...state,
        users: state.users.filter(user => ( user !== action.username ))
      }
    default: 
      return state;
  }
}

export default chatReducer;