import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

// firebase imports
import { auth } from '../firebase.config.js'
import { sendPasswordResetEmail } from 'firebase/auth'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success('password reset link sent to your email')
    } catch (error) {
      console.log(error)
      toast.error('could not send password reset link')
    }
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Forgot Password</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className='emailInput'
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Link className='forgotPasswordLink' to='/sign-in'>Sign In</Link>
          <div className="signInBar">
            <div className="signInText">send reset link</div>
            <button className="signInButton">
              <ArrowRightIcon
                fill='#fff'
                width='34px'
                height='34px'
              />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword