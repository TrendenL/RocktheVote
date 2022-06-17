import React, {useContext} from 'react'
import { UserContext } from '../../../context/UserProvider'
import { Link, Outlet } from 'react-router-dom'

import './Profile.css'

export default function Profile() {
    const { user: {username} } = useContext(UserContext)
return (
    <div className='profile-container'>
        <div className='profile'>
            <h1> Welcome <span className='username'>{ username }!</span></h1>

            <div className='profile-nav'>
                <ul>
                    <li>
                        <Link to='/profile/issues'>My Issues</Link>
                    </li>

                    <li>
                        <Link to='/profile/likes'>My Likes</Link>
                    </li>

                    <li>
                        <Link to='/newissue'>New Issue</Link>
                    </li>
                </ul>
            </div>

            <Outlet />

        </div>
    </div>
)
}
