import React, { useContext} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Auth from './components/pages/Auth/Auth'
import Home from './components/pages/Home/Home'
import Profile from './components/pages/Profile/Profile'
import Issues from './components/pages/Issues/Issues'
import Likes from './components/pages/Likes/Likes'
import NewIssue from './components/pages/Issues/NewIssue'
import InfoIssue from './components/pages/Issues/InfoIssue'
import ProtectedRoute from './components/ProtectedRoute'
import { UserContext } from './context/UserProvider'
import './styles.css'

export default function App() {
    const { token, logout } = useContext(UserContext)
    return (
        <>
            <div className='container'>
                { token && <Navbar logout={logout} />}
                <Routes>
                    <Route path='/' element={ token ? <Navigate to='/home' /> : <Auth />}/>
                    <Route path='/home' element={<ProtectedRoute token={token} redirectTo='/'><Home /></ProtectedRoute>}/>
                    <Route path='/newissue' element={<ProtectedRoute token={token} redirectTo='/'><NewIssue /></ProtectedRoute>}/>
                    <Route path='/profile' element={<ProtectedRoute token={token} redirectTo='/'><Profile /></ProtectedRoute>}>
                        <Route path='issues' element={<Issues />} />
                        <Route path='likes' element={<Likes />} />
                    </Route>
                    <Route path='issues/:issueId' element={<InfoIssue />}/>
                </Routes>
            </div>
        </>
        
    )
}


