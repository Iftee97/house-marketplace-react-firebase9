import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom' // useSearchParams is used to get the query params from the url
import { toast } from 'react-toastify'

// firebase imports
import { db } from '../firebase.config'
import { doc, getDoc } from 'firebase/firestore'

const Contact = () => {
  const [message, setMessage] = useState('')
  const [landlord, setLandlord] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const params = useParams()

  useEffect(() => {
    const fetchLandlord = async () => {
      const docRef = doc(db, 'users', params.landlordId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setLandlord(docSnap.data())
      } else {
        toast.error('could not get landlord data')
      }
    }
    fetchLandlord()
  }, [params.landlordId])

  // console.log(landlord)

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <div className='pageContainer'>
      <header className='pageHeader'>Contact Landlord</header>

      {landlord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {landlord?.name}</p>
          </div>

          <form className='messageForm'>
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">Message</label>
              <textarea
                name="message"
                id="message"
                className='textarea'
                value={message}
                onChange={handleChange}
              />
            </div>

            <a href={`mailto:${landlord.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
              <button type='button' className='primaryButton'>send message</button>
            </a>
          </form>
        </main>
      )}
    </div>
  )
}

export default Contact