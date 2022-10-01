import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// firebase imports
import { db, auth } from '../firebase.config.js'
import { signOut, updateProfile } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'

const Profile = () => {
  const [name, setName] = useState(auth.currentUser.displayName)
  const [email, setEmail] = useState(auth.currentUser.email)
  const [changeDetails, setChangeDetails] = useState(false)
  const nagivate = useNavigate()

  const onLogout = async () => {
    await signOut(auth)
    nagivate('/sign-in') // redirect to sign in page
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update user profile with display name
        await updateProfile(auth.currentUser, { displayName: name })

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, { name })
      }
    } catch (error) {
      console.log(error)
      toast.error('Could not update profile details')
    }
  }

  return (
    <div className='profile'>
      {/* <h1>{user && user.displayName}</h1> */}
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button
          type='button'
          className='logOut'
          onClick={onLogout}
        >
          Logout
        </button>
      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <input
              type="text"
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className='profileEmail'
              disabled={!changeDetails}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </form>
        </div>
      </main>
    </div>
  )
}

export default Profile