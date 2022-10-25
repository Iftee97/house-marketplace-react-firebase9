import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

// firebase imports
import { db, auth } from '../firebase.config.js'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'

// custom hook
import { useAuthContext } from '../hooks/useAuthContext'

const OAuth = ({ sign }) => {
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()

  const onGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const response = await signInWithPopup(auth, provider)
      const user = response.user
      console.log(`signed ${sign} user:`, user)

      // // Check for user in firestore db
      const docSnapshot = await getDoc(doc(db, 'users', user.uid))

      // // if user doesn't exist, add user to firestore db (basically sign up the user)
      if (!docSnapshot.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          createdAt: serverTimestamp(),
        })
      }

      // dispatch LOGIN action -- we can use the same action for login and signup
      dispatch({ type: 'LOGIN', payload: user })

      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error('Could not authorize with Google')
    }
  }

  return (
    <div className='socialLogin'>
      <p>Sign {sign} with </p>
      <button className='socialIconDiv' onClick={onGoogleClick}>
        <img className='socialIconImg' src={googleIcon} alt='google' />
      </button>
    </div>
  )
}

export default OAuth

// this single component will be used for both sign in and sign up