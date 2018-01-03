import * as types from '/actions';

const initialState = {
  isLoading: false,
  message: {},
  session: {},
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.LOG_USER_IN:
      return {
        ...state,
        isLoading: true
      }
    case types.LOG_USER_IN_SUCCESS:
    case types.LOG_USER_IN_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.message
      }

    case types.LOG_USER_OUT:
      return {
        ...state,
        isLoading: true
      }
    case types.LOG_USER_OUT_SUCCESS:
    case types.LOG_USER_OUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.message
      }

    case types.REGISTER_USER:
      return {
        ...state,
        isLoading: true
      }
    case types.REGISTER_USER_SUCCESS:
    case types.REGISTER_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.message
      }

    case types.SET_SESSION:
      return { 
        ...state,
        session: action.session
      }
    case types.SET_MESSAGE:
      return {
        ...state,
        message: action.message
      }

    default:
      return state;
  }
}

export default authReducer;