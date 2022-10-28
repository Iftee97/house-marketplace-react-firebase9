import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'

// firebase imports
import { db, auth } from '../firebase.config'
import { doc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const Listing = () => {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(null)
  const [shareLinkCopied, setShareLinkCopied] = useState(null)

  const navigate = useNavigate()
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
  }, [params.listingId, navigate])

  return (
    <div>Listing</div>
  )
}

export default Listing