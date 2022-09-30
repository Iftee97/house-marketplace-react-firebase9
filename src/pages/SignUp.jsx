import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

// firebase imports
import { db, auth } from '../firebase.config.js'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log("registered user: ", user)
      await updateProfile(auth.currentUser, { displayName: name })
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        createdAt: serverTimestamp()
      })
      navigate('/') // redirect to home (explore) page
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
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
              <p className="signUpText">Sign In</p>
              <button className='signUpButton'>
                <ArrowRightIcon
                  fill='#fff'
                  width='34px'
                  height='34px'
                />
              </button>
            </div>
          </form>

          {/* google OAuth component */}

          <Link to='/sign-in' className='registerLlink'>Sign In instead</Link>
        </main>
      </div>
    </>
  )
}

export default SignUp