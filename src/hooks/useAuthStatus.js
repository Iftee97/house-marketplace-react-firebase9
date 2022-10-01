import { useState, useEffect, useRef } from 'react'

// firebase imports
import { auth } from '../firebase.config.js'
import { onAuthStateChanged } from "firebase/auth"

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const isMounted = useRef(true) // this is for useEffect clean-up function to avoid memory leaks

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true)
        } else {
          setLoggedIn(false)
        }
      })
    }

    // clean-up function
    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  return { loggedIn }
}