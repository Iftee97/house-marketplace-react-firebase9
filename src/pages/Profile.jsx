import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ListingItem from '../components/ListingItem'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import { toast } from 'react-toastify'

// firebase imports
import { db, auth } from '../firebase.config.js'
import { signOut } from 'firebase/auth'
import {
  collection, getDocs, query, where, orderBy, doc, deleteDoc
} from 'firebase/firestore'

// custom hook
import { useAuthContext } from '../hooks/useAuthContext'

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()

  useEffect(() => {
    const fetchUserListings = async () => {
      setLoading(true)
      const listingsRef = collection(db, 'listings') // create ref

      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      ) // create query

      const querySnap = await getDocs(q) // get query snapshot

      let listings = []
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings(listings)
      setLoading(false)
    }
    fetchUserListings()
  }, [])

  const handleClick = async () => {
    await signOut(auth)
    dispatch({ type: "LOGOUT" }) // dispatch LOGOUT action
    navigate('/sign-in') // redirect to sign in page
  }

  // console.log("auth.currentUser.displayName:", auth.currentUser.displayName)

  const onDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      const listingRef = doc(db, 'listings', id)
      await deleteDoc(listingRef)

      const updatedListings = listings.filter((listing) => listing.id !== id)
      setListings(updatedListings)
      toast.success('Successfully deleted listing')
    }
  }

  const onEdit = (id) => {
    navigate(`/edit-listing/${id}`)
  }

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

        {!loading && listings.length > 0 && (
          <>
            <p className="listingText">Your listings</p>
            <ul className="listingsList">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  )
}

export default Profile