import React from 'react'
import { Link } from 'react-router-dom'
import {FaUser, FaSignOutAlt, FaHome} from 'react-icons/fa'
import './navbar.css'

export default function Navbar(props) {
    const { logout } = props
    return (
        <div className='navbar'>
            
                <Link to='/'>
                <div className='logo'>
                    <h2>Rock the Vote!!</h2>
                    </div>
                </Link>
            

            <div className='nav-pages'>

                <ul className=''>
                    <li>
                        <Link to='/home '>
                            <FaHome/>
                        </Link>
                    </li>
                    <li>
                        <Link to='/profile/issues'>
                            <FaUser/>
                        </Link>
                    </li>
                    <li>
                        <button onClick={logout}>
                            <FaSignOutAlt/> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
