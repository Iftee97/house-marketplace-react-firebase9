import { useState, useEffect } from 'react'

// firebase imports
import { auth } from '../firebase.config.js'
import { onAuthStateChanged } from "firebase/auth"

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      }
    })
  }, [])

  return { loggedIn }
}