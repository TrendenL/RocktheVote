import React from 'react'
import './comment.css'

export default function ListComments(props) {
    const {comment, username} = props
    return (
    <div className='comments'>
        <p>{comment} - <span>{username}</span></p>
    </div>
)
}
