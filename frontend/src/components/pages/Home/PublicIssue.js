import React from 'react'

import './home.css'

export default function PublicIssue(props) {
    const { title, content, user: {username}} = props
  return (
    <div className='info-container'>
        <div className='info-issue'>
            <h1>{title}</h1>
            <p>{content}</p>
            <p>{username}</p>
        </div>
    </div>
  )
}
