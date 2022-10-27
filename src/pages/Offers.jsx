import React, { useState, useEffect } from 'react'
import { db } from '../firebase.config'
import {
  collection, getDocs, query, where, orderBy, limit, startAfter,
} from 'firebase/firestore'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'

const Offers = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get reference
        const listingsRef = collection(db, 'listings')

        // create a query
        const q = query(
          listingsRef, // collection(db, 'listings')
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10)
        )

        // execute query
        const querySnap = await getDocs(q)

        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        console.log(error)
        toast.error('could not fetch listings')
      }
    }
    fetchListings()
  }, [])

  return (
    <div className='category'>
      <header>
        <p className="pageHeader">Offers</p>
      </header>
      {loading ? (
        // <p>loading...</p>
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
        </>
      ) : <p>There are no current offers.</p>}
    </div>
  )
}

export default Offers