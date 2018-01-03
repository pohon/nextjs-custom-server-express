import * as types from '/actions';

let initialState = {
  users: [],
  user: {},
  isLoading: true,
  isEdit: false,
  editStatus: '',
  deleteStatus: '',
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.LOAD_USER:
    case types.GET_USER:
    case types.CREATE_USER:
      return {
        ...state,
        isLoading: true
      }
    case types.DELETE_USER:
      return {
        ...state,
        isLoading: true,
        deleteStatus: ''
      }
    case types.EDIT_USER:
      return {
        ...state,
        isLoading: true,
        editStatus: ''
      }
    case types.LOAD_USER_SUCCESS:
    case types.LOAD_USER_FAILURE:
    case types.GET_USER_SUCCESS:
    case types.GET_USER_FAILURE:
    case types.CREATE_USER_SUCCESS:
    case types.CREATE_USER_FAILURE:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      }
    case types.EDIT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        editStatus: 'User data has been updated'
      }
    case types.EDIT_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        editStatus: 'Failed to update user data'
      }
    case types.DELETE_USER_SUCCESS:
      const users = state.users.filter(user => { return user.id != action.id })

      return {
        ...state,
        users,
        isLoading: false,
        deleteStatus: 'User has been deleted'
      }
    case types.DELETE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        deleteStatus: 'Failed to delete user'
      }

    default:
      return state;
  }
} 

export default userReducer;