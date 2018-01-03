import * as types from '/actions';

const initialState = {
  locale: '',
  localePath: ''
}

const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.CHANGE_LOCALE:
      return {
        ...state,
        locale: action.locale,
        localePath: action.localePath
      }
    default:
      return state;
  }
}

export default appReducer;