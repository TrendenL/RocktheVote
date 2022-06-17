import React from 'react'

import './issue.css'

export default function Issue(props) {
    const { title, content } = props
    // console.log(props)
        return (
        <div className='issue'>
            <h1>{ title }:</h1>
            <p>{ content }</p>
        </div>
    )
}
