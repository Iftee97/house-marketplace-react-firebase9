import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// pages and components
import Navbar from './components/Navbar'
import Explore from './pages/Explore'
import Category from './pages/Category'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import CreateListing from './pages/CreateListing'
import EditListing from './pages/EditListing'
import Listing from './pages/Listing'
import Contact from './pages/Contact'

// custom hook
import { useAuthContext } from './hooks/useAuthContext'

const App = () => {
  const { authIsReady, user } = useAuthContext()

  return (
    <>
      {authIsReady && (
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Explore />}
            />
            <Route
              path='/offers'
              element={<Offers />}
            />
            <Route
              path='/category/:categoryName'
              element={<Category />}
            />
            <Route
              path='/profile'
              element={user ? <Profile /> : <Navigate to='/sign-in' />}
            />
            <Route
              path='/create-listing'
              element={user ? <CreateListing /> : <Navigate to='/sign-in' />}
            />
            <Route
              path='/edit-listing/:listingId'
              element={user ? <EditListing /> : <Navigate to='/sign-in' />}
            />
            <Route
              path='/category/:categoryName/:listingId'
              element={<Listing />}
            />
            <Route
              path='/contact/:landlordId'
              element={<Contact />}
            />
            <Route
              path='/sign-in'
              element={!user ? <SignIn /> : <Navigate to='/' />}
            />
            <Route
              path='/sign-up'
              element={!user ? <SignUp /> : <Navigate to='/' />}
            />
            <Route
              path='/forgot-password'
              element={<ForgotPassword />}
            />
          </Routes>
          <Navbar />
        </Router>
      )}
      <ToastContainer />
    </>
  )
}

export default App