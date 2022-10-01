import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'

// firebase imports
import { db, auth } from '../firebase.config.js'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password) // sign up user
      const user = response.user
      // console.log("registered user: ", user)
      await updateProfile(user, { displayName: name }) // update user profile with displayName
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        createdAt: serverTimestamp()
      }) // add user to firestore db
      setLoading(false)
      navigate('/') // redirect to home (explore) page
    } catch (error) {
      console.log(error)
      toast.error("could not register. something went wrong with registration")
      setLoading(false)
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Sign Up</p>
        </header>

        <main>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder='Name'
              className="nameInput"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder='Email'
              className="emailInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="passwordInputDiv">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                className="passwordInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                className='showPassword'
                src={visibilityIcon}
                alt="show password"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>

            <Link to='/forgot-password' className='forgotPasswordLink'>
              Forgot Password?
            </Link>

            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              {!loading && (
                <button className='signUpButton'>
                  <ArrowRightIcon
                    fill='#fff'
                    width='34px'
                    height='34px'
                  />
                </button>
              )}
            </div>
            {loading && <p>signing up...</p>}
          </form>

          <OAuth sign="up" />

          {!loading && (
            <Link to='/sign-in' className='registerLink'>
              Sign In instead
            </Link>
          )}
        </main>
      </div>
    </>
  )
}

export default SignUp