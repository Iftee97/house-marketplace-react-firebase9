import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

// firebase imports
import { auth } from '../firebase.config.js'
import { signInWithEmailAndPassword } from 'firebase/auth'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password) // sign in user
      const user = userCredential.user
      console.log("signed in user: ", user)
      if (user) navigate('/') // redirect to home (explore) page
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

            <div className="signInBar">
              <p className="signInText">Sign In</p>
              <button className='signInButton'>
                <ArrowRightIcon
                  fill='#fff'
                  width='34px'
                  height='34px'
                />
              </button>
            </div>
          </form>

          {/* google OAuth component */}

          <Link to='/sign-up' className='registerLlink'>Sign Up instead</Link>
        </main>
      </div>
    </>
  )
}

export default SignIn