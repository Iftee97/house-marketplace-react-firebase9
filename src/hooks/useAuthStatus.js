import { useState, useEffect } from 'react'

// firebase imports
import { auth } from '../firebase.config.js'
import { onAuthStateChanged } from "firebase/auth"

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      }
      unsubscribe()
    })
  }, [])

  return { loggedIn }
}