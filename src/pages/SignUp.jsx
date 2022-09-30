import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <main>
          <form>
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