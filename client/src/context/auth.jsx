import React, { createContext, useReducer } from "react"
import jwtDecode from "jwt-decode"

const INITIAL_STATE = {
  user: null
}

export const getAuthToken = () => localStorage.getItem("@MERNG/authToken")

export const setAuthToken = token => localStorage.setItem("@MERNG/authToken", token)

export const removeAuthToken = () => localStorage.removeItem("@MERNG/authToken")

if (getAuthToken()) {
  const decodedToken = jwtDecode(getAuthToken())
  if (decodedToken.exp * 1000 < Date.now()) {
    removeAuthToken()
  } else {
    INITIAL_STATE.user = decodedToken
  }
}

const AuthContext = createContext({
  user: null,
  signIn: data => {},
  signOut: () => {}
})

const authReducer = (state, { type, payload }) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (type) {
    case "SIGN_IN":
      return { ...newState, user: payload }
    case "SIGN_OUT":
      return { ...newState, user: payload }
    default:
      return newState
  }
}

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)
  const signIn = userData => {
    setAuthToken(userData.token)
    dispatch({ type: "SIGN_IN", payload: userData })
  }
  const signOut = () => {
    removeAuthToken()
    dispatch({ type: "SIGN_OUT", payload: null })
  }
  return <AuthContext.Provider value={{ user: state.user, signIn, signOut }} {...props} />
}

export { AuthContext, AuthProvider }
