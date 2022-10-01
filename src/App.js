import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// pages and components
import Navbar from './components/Navbar'
import Explore from './pages/Explore'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'

// custom hook
import { useAuthStatus } from './hooks/useAuthStatus'

const App = () => {
  const { loggedIn } = useAuthStatus()

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route
            path='/profile'
            element={loggedIn ? <Profile /> : <Navigate to='/sign-in' />}
          />
          <Route
            path='/sign-in'
            element={!loggedIn ? <SignIn /> : <Navigate to='/' />}
          />
          <Route
            path='/sign-up'
            element={!loggedIn ? <SignUp /> : <Navigate to='/' />}
          />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App