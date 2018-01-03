import * as types from '/actions'

export const changeLocale = (locale, localePath) => {
  return {
    type: types.CHANGE_LOCALE,
    locale,
    localePath
  }
}
