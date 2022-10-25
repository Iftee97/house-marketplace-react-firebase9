import { createContext, useReducer, useEffect } from 'react'
import { auth } from '../firebase.config'
import { onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      }

    case 'LOGOUT':
      return {
        ...state,
        user: null
      }

    case 'AUTH_IS_READY':
      return {
        user: action.payload,
        authIsReady: true
      }

    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(authReducer, initialState) // this could be used instead of the below
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  })

  // the following code handles weird auth status behaviors on refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
      unsubscribe()
    })
  }, [])

  // console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}