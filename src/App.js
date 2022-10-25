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

// custom hook
import { useAuthStatus } from './hooks/useAuthStatus'

const App = () => {
  const {
    loggedIn,
    user
  } = useAuthStatus()
  console.log('user:', user)

  return (
    <>
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
          <Route
            path='/create-listing'
            element={<CreateListing />}
          // element={user ? <CreateListing /> : <Navigate to='/sign-in' />}
          />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App