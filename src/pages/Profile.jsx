import React, { useState, useEffect } from 'react'

// firebase imports
import { auth } from '../firebase.config.js'

const Profile = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log("current user:", auth.currentUser)
    setUser(auth.currentUser)
  }, [])

  return (
    <div>
      <h1>{user && user.displayName}</h1>
    </div>
  )
}

export default Profile