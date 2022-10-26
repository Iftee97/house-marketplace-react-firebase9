import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import ListingItem from '../components/ListingItem'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

// firebase imports
import { auth } from '../firebase.config.js'
import { signOut } from 'firebase/auth'

// custom hook
import { useAuthContext } from '../hooks/useAuthContext'

const Profile = () => {
  const nagivate = useNavigate()
  const { dispatch } = useAuthContext()

  const handleClick = async () => {
    await signOut(auth)

    // dispatch LOGOUT action
    dispatch({ type: "LOGOUT" })

    nagivate('/sign-in') // redirect to sign in page
  }

  console.log("auth.currentUser.displayName:", auth.currentUser.displayName)

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button
          type='button'
          className='logOut'
          onClick={handleClick}
        >
          Logout
        </button>
      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
        </div>

        <div className="profileCard">
          <span>
            username: {" "}
            <p className='profileName'>{auth.currentUser.displayName}</p>
          </span> <br /> <br />
          <span>
            email: {" "}
            <p className='profileEmail'>{auth.currentUser.email}</p>
          </span>
        </div>

        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt="home" />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>
      </main>
    </div>
  )
}

export default Profile