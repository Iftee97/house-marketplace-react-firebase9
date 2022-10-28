import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import shareIcon from '../assets/svg/shareIcon.svg'
import Spinner from '../components/Spinner'

// firebase imports
import { db, auth } from '../firebase.config'
import { doc, getDoc } from 'firebase/firestore'

// swiper imports
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Listing = () => {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(null)
  const [shareLinkCopied, setShareLinkCopied] = useState(null)

  const params = useParams()

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      }
    }
    fetchListing()
  }, [params.listingId])

  // console.log('listing:', listing)

  if (loading) {
    return <Spinner />
  }

  return (
    <main>
      {listing && (
        <>
          <Swiper slidesPerView={1} modules={[Navigation, Pagination, Scrollbar, A11y]}>
            {listing.imgUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    background: `url(${url}) center no-repeat`,
                    // background: `url(${listing.imgUrls[index]}) center no-repeat`,
                    backgroundSize: 'cover',
                    height: '30vh',
                  }}
                  className='swiperSlideDiv'
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className='shareIconDiv'
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              setShareLinkCopied(true)
              setTimeout(() => {
                setShareLinkCopied(false)
              }, 2000)
            }}
          >
            <img src={shareIcon} alt='share icon' />
          </div>
          {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

          <div className='listingDetails'>
            <p className='listingName'>
              {listing.name} - {' '}
              ${listing.offer
                ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </p>
            <p className='listingLocation'>{listing.location}</p>
            <p className='listingType'>
              For {listing.type === 'rent' ? 'Rent' : 'Sale'}
            </p>
            {listing.offer && (
              <p className='discountPrice'>
                ${listing.regularPrice - listing.discountedPrice} discount
              </p>
            )}

            <ul className='listingDetailsList'>
              <li>
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Bedrooms`
                  : '1 Bedroom'}
              </li>
              <li>
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms`
                  : '1 Bathroom'}
              </li>
              <li>{listing.parking && 'Parking Spot'}</li>
              <li>{listing.furnished && 'Furnished'}</li>
            </ul>

            {/*
              <p className='listingLocationTitle'>Location</p>

              MAP GOES HERE -- WE'LL GET BACK TO THIS LATER 
              WE NEED TO GEOCODE AN ENTERED ADDRESS TO GET LAT/LONG
              WE WILL USE MAPBOX INSTEAD OF GOOGLE GEOCODING API FOR GEOCODING
              THEN WE WILL USE LEAFLET/MAPBOX TO DISPLAY THE MAP
            */}

            {auth.currentUser?.uid !== listing.userRef && (
              <Link
                to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                className='primaryButton'
              >
                Contact Landlord
              </Link>
            )}
          </div>
        </>
      )}
    </main>
  )
}

export default Listing