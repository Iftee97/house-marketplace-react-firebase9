import { useState, useEffect, useRef } from 'react'

// firebase imports
import { auth } from '../firebase.config.js'
import { onAuthStateChanged } from "firebase/auth"

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(auth.currentUser)
  const isMounted = useRef(true) // this is for useEffect clean-up function to avoid memory leaks

  useEffect(() => {
    if (isMounted) {
      console.log("auth.currentUser:", auth.currentUser)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true)
          setUser(user)
        } else {
          setLoggedIn(false)
          setUser(null)
        }
      })
    }

    // // clean-up function
    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  return {
    loggedIn,
    user
  }
}

// need to use context api for this -- this needs to change