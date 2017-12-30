import * as actionTypes from '../actions/actionTypes'
import { updateOjbect } from '../utility'

const initalState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
}

const authStart = (state, action) => {
  return updateOjbect(state, {
    error: null,
    loading: true
  })
}

const authSuccess = (state, action) => {
  return updateOjbect(state, {
    error: null,
    loading: false,
    token: action.idToken,
    userId: action.userId
  })
}

const authFail = (state, action) => {
  return updateOjbect(state, {
    error: action.error,
    loading: false
  })
}

const authLogout = (state, action) => {
  return updateOjbect(state, {
    token: null,
    userId: null
  })
}

const setAuthRedirectPath = (state, action) => {
  return updateOjbect(state, {
    authRedirectPath: action.path
  })
 }

const reducer = (state=initalState, action) => {
  switch(action.type){
    case actionTypes.AUTH_START:
      return authStart(state, action)
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action)
    case actionTypes.AUTH_FAIL:
      return authFail(state, action)
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action)
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action)
    default:
      return state
  }
}

export default reducer