import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import { useAuth } from './hooks/useAuth'
import { useThemes } from './hooks/useThemes'
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast'
function App() {
  const {authUser,checkAuth, isCheckingAuth} = useAuth();
  const {theme} =  useThemes();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-full'>
      <Loader className='size-13 animate-spin'/>
    </div> 
  )
  
  
  return (
    
    <div data-theme={theme}>
      <Nav/>
      <Routes>
        <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login"></Navigate>}/>
        <Route path="/signup" element={!authUser?<SignupPage/>:<Navigate to="/"></Navigate>}/>
        <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to="/"></Navigate>}/>
        <Route path="/setting" element={<SettingPage/>}/>
        <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"></Navigate>}/>
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App