import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase.config'
import {
  collection, getDocs, query, where, orderBy, limit, startAfter,
} from 'firebase/firestore'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'

const Category = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get reference
        const listingsRef = collection(db, 'listings')

        // create a query
        const q = query(
          listingsRef, // collection(db, 'listings')
          where('type', '==', params.categoryName),
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
  }, [params.categoryName])

  return (
    <div className='category'>
      <header>
        <p className="pageHeader">
          {params.categoryName === 'rent' ? 'Places for rent' : 'Places for sale'}
        </p>
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
      ) : <p>No listings for {params.categoryName}</p>}
    </div>
  )
}

export default Category