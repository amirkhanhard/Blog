import { useState, useEffect } from 'react'
import './App.css'
import authService from './appwrite/auth';
import {useDispatch} from "react-redux"
import {Header, Footer} from "./components"
import { Outlet, BrowserRouter} from 'react-router-dom';
import {login as authLogin} from "./store/authSlice"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(authLogin({userData}));
      } else {
        dispatch(logout());
      }
    })
    .finally(()=> {
      setLoading(false);
    })
  },[])
  return !loading ? (
      
    <div className='min-h-screen flex flex-wrap content-between '>
      <div className='w-full block'>
        {/* Header */}
        <Header />
        {/* TODO: */}
          <Outlet />
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
