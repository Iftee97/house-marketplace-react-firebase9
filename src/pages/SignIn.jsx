import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'

// firebase imports
import { auth } from '../firebase.config.js'
import { signInWithEmailAndPassword } from 'firebase/auth'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password) // sign in user
      const user = userCredential.user
      // console.log("signed in user: ", user)
      setLoading(false)
      if (user) navigate('/') // redirect to home (explore) page
    } catch (error) {
      console.log(error)
      toast.error("could not login. incorrect user credentials")
      setLoading(false)
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Sign In</p>
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
              {!loading && (
                <button className='signInButton'>
                  <ArrowRightIcon
                    fill='#fff'
                    width='34px'
                    height='34px'
                  />
                </button>
              )}
            </div>
            {loading && <p>signing in...</p>}
          </form>

          <OAuth sign="in" />

          {!loading && (
            <Link to='/sign-up' className='registerLink'>
              Sign Up instead
            </Link>
          )}
        </main>
      </div>
    </>
  )
}

export default SignIn